import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { CreateBucketDto, FindAllBucketDto } from './buckets.dto';
import { Bucket } from '../../entities/bucket.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';

@Controller('/s3/buckets')
@ApiTags('Buckets')
export class BucketsController {
  constructor(private bucketsService: BucketsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new Bucket' })
  create(@Body() body: CreateBucketDto) {
    return this.bucketsService.create(body);
  }

  @Delete(':name')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a existing bucket' })
  delete(@Param('name') bucketName: string) {
    return this.bucketsService.delete(bucketName);
  }

  @Get()
  @ApiOperation({ summary: 'List all buckets' })
  findAll(@Query() query: FindAllBucketDto) {
    return this.bucketsService.findAll(query);
  }
}
