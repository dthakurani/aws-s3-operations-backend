import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateBucketDto {
  @IsNotEmpty({ message: 'Bucket name must not be empty' })
  @IsString({ message: 'Bucket name must be a string' })
  @Length(3, 63, { message: 'Bucket name must be between 3 and 63 characters' })
  @Matches(/^[a-z0-9]+([-.][a-z0-9]+)*$/, {
    message: 'Invalid bucket name',
  })
  name: string;

  @IsOptional()
  @IsBoolean()
  versioning: boolean;
}
