import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class Timeline {
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date;
  @IsDate()
  @Type(() => Date)
  readonly endDate: Date;
}
