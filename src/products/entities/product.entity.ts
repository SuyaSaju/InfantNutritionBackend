import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Review } from './review.entity';
import { Rating } from './rating.entity';
import { Price } from './price.entity';
import { Sentiment } from './sentiment.entity';
import { Photo } from '../Photo';

@Entity({ name: 'products' })
export class Product {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  brandId: string;

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

  @Column()
  price: Price;

  @Column()
  sentiment: Sentiment;
}
