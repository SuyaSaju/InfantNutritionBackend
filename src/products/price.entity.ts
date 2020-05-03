import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'prices' })
export class Price {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  productId: ObjectID;

  @Column()
  amount: number;

  @Column()
  currency: string
}
