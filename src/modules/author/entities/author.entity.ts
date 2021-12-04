import { Book } from 'modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  // One to many relationship.
  // An author can have many books.
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
