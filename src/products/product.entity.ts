import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({name: 'products'})
export class Product {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;
}
