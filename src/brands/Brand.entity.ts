import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'brands' })
export class Brand {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
}
