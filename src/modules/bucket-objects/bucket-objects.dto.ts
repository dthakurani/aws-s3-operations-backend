import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class CreateBucketObjectDto {
  @IsOptional()
  @ApiProperty({
    description: 'Metadata for object',
    required: false,
  })
  metadata: object;

  @ApiProperty({
    description: 'Object file',
    type: 'string',
    format: 'binary',
  })
  file: any;
}

export class FindOneBucketObjectDto {
  @IsOptional()
  @ApiProperty({
    description: 'Get particular version of object',
    required: false,
  })
  version_id: string;
}

export class FindAllBucketObjectsDto {
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

export class FindAllBucketObjectVersionsDto {
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
