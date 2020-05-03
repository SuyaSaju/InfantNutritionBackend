import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'reviews' })
export class Review {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  brandId: string;

  @Column()
  @ManyToOne(type => Product, product => product.reviews)
  productId: string;

  @Column()
  name: string;

  @Column()
  rating: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  isVerifiedPurchase: boolean;

  @Column()
  textContent: string;

  @Column()
  foundHelpful: number;

  @Column()
  sentiment: ReviewSentiment;
}

export interface ReviewSentiment {
  positive: number
  negative: number
  neutral: number
  compound: number
}
