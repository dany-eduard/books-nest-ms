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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    await this.booksService.create(createBookDto);
    return created('Book created');
  }

  @Get()
  async findAll() {
    const books = await this.booksService.findAll();
    return ok('Books obtained', books);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.booksService.findOne(+id);
    return ok('Book obtained', book);
  }

  @Get('category/:id')
  async findByCategory(@Param('id') category: string) {
    const books = await this.booksService.findByCategory(+category);
    return ok('Books obtained', books);
  }

  @Get('author/:id')
  async findByAuthor(@Param('id') author: string) {
    const books = await this.booksService.findByAuthor(+author);
    return ok('Books obtained', books);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    await this.booksService.update(+id, updateBookDto);
    return update();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.booksService.remove(+id);
    return update('Removed success');
  }
}
