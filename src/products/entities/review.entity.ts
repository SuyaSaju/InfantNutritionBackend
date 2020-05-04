import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  brandId: string;

  @Column()
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
