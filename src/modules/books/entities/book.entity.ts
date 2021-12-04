import { Author } from 'modules/author/entities/author.entity';
import { Category } from 'modules/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('int')
  basePrice: number;

  // Many to one relationship.
  // Several books can have the same author.
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorID' }) // Field name for foreign key
  author: Author;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'categoryID' })
  category: Author;
}
