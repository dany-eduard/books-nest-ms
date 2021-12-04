import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { httpException } from 'helpers/api.httpexception';
import { Author } from 'modules/author/entities/author.entity';
import { Category } from 'modules/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const author = await this.authorRepository.findOne(createBookDto.authorID);
    const category = await this.categoryRepository.findOne(
      createBookDto.categoryID,
    );
    if (!author || !category) {
      const ms = !author
        ? `There is no author with the id ${createBookDto.authorID}`
        : `There is no category with the id ${createBookDto.categoryID}`;

      httpException(`Book could not be created. ${ms}`, HttpStatus.NOT_FOUND);
    }

    const newBook = new Book();
    newBook.author = author;
    newBook.category = category;
    newBook.basePrice = createBookDto.basePrice;
    newBook.name = createBookDto.name;

    const bookRecord = await this.bookRepository.save(newBook);
    return bookRecord.id;
  }

  async findAll() {
    return this.bookRepository.find({ relations: ['author', 'category'] });
  }

  async findOne(id: number) {
    const bookRecord = await this.bookRepository.findOne(id);
    if (!bookRecord)
      httpException(`Book with id ${id} not found`, HttpStatus.NOT_FOUND);
    return bookRecord;
  }

  async findByCategory(categoryID: number) {
    const category = await this.categoryRepository.findOne(categoryID);
    if (!category) {
      httpException(
        `There is no category with the id ${categoryID}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.bookRepository.find({
      where: { category },
      relations: ['category'],
    });
  }

  async findByAuthor(authorID: number) {
    const author = await this.authorRepository.findOne(authorID);
    if (!author) {
      httpException(
        `There is no author with the id ${authorID}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.bookRepository.find({
      where: { author },
      relations: ['author'],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
