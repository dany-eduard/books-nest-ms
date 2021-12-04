import { Book } from 'modules/books/entities/book.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column('int')
  totalSale: number;

  @Column('int')
  quantity: number;

  @Column()
  bookName: string;
}
