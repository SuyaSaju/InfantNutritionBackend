import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'ratings' })
export class Rating {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  brandId: string;

  @Column()
  productId: string;

  @Column()
  overall: number;

  @Column()
  total: number;

  @Column()
  fiveStars: number;

  @Column()
  fourStars: number;

  @Column()
  threeStars: number;

  @Column()
  twoStars: number;

  @Column()
  oneStars: number;

  @Column()
  date: Date
}
