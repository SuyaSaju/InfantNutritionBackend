import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Products {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;
}
