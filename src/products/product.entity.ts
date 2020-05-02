import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Photo } from './Photo';

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

  @Column()
  photos : Array<Photo>

}
