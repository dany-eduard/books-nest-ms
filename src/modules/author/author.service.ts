import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const authorRecord = await this.authorRepository.save(createAuthorDto);
    return authorRecord.id;
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    return this.authorRepository.delete(id);
  }
}
