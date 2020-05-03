import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Photo } from './Photo';
import { Review } from './review.entity';
import { Rating } from './rating.entity';

@Entity({ name: 'products_v1' })
export class Product {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  brandId: ObjectID;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  photos: Photo[];

  @Column()
  reviews: Review[];

  @Column()
  rating: Rating;
}
