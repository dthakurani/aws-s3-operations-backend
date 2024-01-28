import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { CreateBucketDto } from './buckets.dto';
import { Bucket } from '../../entities/bucket.entity';

@Controller('/s3/buckets')
export class BucketsController {
  constructor(private bucketsService: BucketsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateBucketDto): Promise<Bucket> {
    return this.bucketsService.create(body);
  }
}
