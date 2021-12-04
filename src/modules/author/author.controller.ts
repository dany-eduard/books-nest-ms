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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    await this.authorService.create(createAuthorDto);
    return created('Author created');
  }

  @Get()
  async findAll() {
    const authors = await this.authorService.findAll();
    return ok('Authors obtained', authors);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const author = await this.authorService.findOne(+id);
    return ok('Author obtained', author);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    await this.authorService.update(+id, updateAuthorDto);
    return update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
