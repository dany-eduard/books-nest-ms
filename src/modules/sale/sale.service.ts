import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { httpException } from 'helpers/api.httpexception';
import { Book } from 'modules/books/entities/book.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const bookRecord = await this.bookRepository.findOne(createSaleDto.bookID);
    if (!bookRecord)
      httpException(
        `Book with id ${createSaleDto.bookID} not found`,
        HttpStatus.NOT_FOUND,
      );

    if (bookRecord.quantity < createSaleDto.quantity)
      httpException(
        `Book with id ${createSaleDto.bookID} has only ${bookRecord.quantity} quantity`,
        HttpStatus.FORBIDDEN,
      );

    const newSale = new Sale();
    newSale.bookName = bookRecord.name;
    newSale.quantity = createSaleDto.quantity;
    newSale.totalSale = bookRecord.basePrice * createSaleDto.quantity;
    newSale.date = new Date(Date.now())
      .toLocaleDateString()
      .replace(/\//g, '-');

    const saleRecord = await this.saleRepository.save(newSale);

    await this.bookRepository.update(createSaleDto.bookID, {
      quantity: bookRecord.quantity - createSaleDto.quantity,
    });

    return saleRecord;
  }

  async findByDate(date: string) {
    const saleRecord = await this.saleRepository.find({
      where: { date },
    });
    if (!saleRecord)
      httpException(`Sale with date ${date} not found`, HttpStatus.NOT_FOUND);
    console.log('findByDate', saleRecord);

    const totalSale = saleRecord.reduce((acc, curr) => {
      return acc + curr.totalSale;
    }, 0);

    const totalQuantity = saleRecord.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);

    return { saleRecord, totalSale, totalQuantity };
  }

  /**
   * ??? Not working yet!
   */
  async findByDateRange(startDate: string, endDate: string) {
    const saleRecord = await this.saleRepository.find({
      where: [
        {
          date: MoreThanOrEqual(startDate),
        },
        {
          date: LessThanOrEqual(endDate),
        },
      ],
    });
    if (!saleRecord)
      httpException(
        `Sale with date range ${startDate} - ${endDate} not found`,
        HttpStatus.NOT_FOUND,
      );

    return saleRecord;
  }

  findAll() {
    return this.saleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
