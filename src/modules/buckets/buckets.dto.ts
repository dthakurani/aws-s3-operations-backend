import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
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
  @ApiProperty({
    description: 'Name of bucket',
  })
  name: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Pass boolean for enabling versioning or not',
  })
  versioning: boolean;
}

export class FindAllBucketDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
  })
  page: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    description: 'Number of items per page',
    required: false,
  })
  limit: number;
}
