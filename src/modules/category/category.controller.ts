import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { created, ok, update } from 'helpers/api.response';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoryService.create(createCategoryDto);
    return created('Category created');
  }

  @Get()
  async findAll() {
    const category = await this.categoryService.findAll();
    return ok('Categories obtained', category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const categories = await this.categoryService.findOne(+id);
    return ok('Categorie obtained', categories);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoryService.update(+id, updateCategoryDto);
    return update();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
    return update('Removed success');
  }
}
