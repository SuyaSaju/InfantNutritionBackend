import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';
import { Photo } from './Photo';
import { Review } from './review.entity';
import { Rating } from './rating.entity';
import { Price } from './price.entity';
import { Sentiment } from './sentiment.entity';

@Entity({ name: 'products_v1' })
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
  @OneToMany(type => Review, review => review.productId)
  reviews: Review[];

  @Column()
  rating: Rating;

  @Column()
  price: Price;

  @Column()
  sentiment: Sentiment;
}
