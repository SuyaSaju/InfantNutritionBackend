import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'prices' })
export class Price {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  productId: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  date: Date
}
