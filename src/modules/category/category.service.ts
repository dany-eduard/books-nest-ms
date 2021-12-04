import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { httpException } from 'helpers/api.httpexception';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryRecord = await this.categoryRepository.save(
      createCategoryDto,
    );
    return categoryRecord.id;
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const categoryRecord = await this.categoryRepository.findOne(id);
    if (!categoryRecord)
      httpException(`Category with id ${id} not found`, HttpStatus.NOT_FOUND);
    return categoryRecord;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const delRecord = await this.categoryRepository.delete(id);
    if (delRecord.affected < 1)
      httpException(`Category with id ${id} not found`, HttpStatus.NOT_FOUND);
    return delRecord;
  }
}
