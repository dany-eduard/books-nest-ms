import { Module } from '@nestjs/common';
import { BooksModule } from './modules/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'modules/books/entities/book.entity';
import { AuthorModule } from './modules/author/author.module';
import { Author } from 'modules/author/entities/author.entity';
import { CategoryModule } from './modules/category/category.module';
import { Category } from 'modules/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [Book, Author, Category],
    }),
    BooksModule,
    AuthorModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
