import { IsOptional } from 'class-validator';

export class CreateBucketObjectDto {
  @IsOptional()
  metadata: object;
}

export class FindOneBucketObjectDto {
  @IsOptional()
  version_id: string;
}
