import { Book } from 'modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  // One to many relationship.
  // A category can have many books.
  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
