import { Module } from '@nestjs/common';
import { BucketObjectsController } from './bucket-objects.controller';
import { BucketObjectsService } from './bucket-objects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketObject } from '../../entities/bucket-object.entity';
import { Bucket } from '../../entities/bucket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bucket, BucketObject])],
  controllers: [BucketObjectsController],
  providers: [BucketObjectsService],
})
export class BucketObjectsModule {}
