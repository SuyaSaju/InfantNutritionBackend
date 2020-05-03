import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'sentiments' })
export class Sentiment {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  productId: ObjectID;

  @Column()
  positive: number;

  @Column()
  negative: number;

  @Column()
  neutral: number;

  @Column()
  compound: number;

}
