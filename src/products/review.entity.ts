import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  brandId: ObjectID;

  @ObjectIdColumn()
  productId: ObjectID;

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
  sentiment: ReviewSentiment
}
export interface ReviewSentiment {
  positive: number
  negative: number
  neutral: number
  compound: number
}
