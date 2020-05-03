import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'ratings' })
export class Rating {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  brandId: ObjectID;

  @ObjectIdColumn()
  productId: ObjectID;

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
}
