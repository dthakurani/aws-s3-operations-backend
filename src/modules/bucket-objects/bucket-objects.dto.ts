import { IsOptional } from 'class-validator';

export class CreateBucketObjectDto {
  @IsOptional()
  metadata: object;
}
