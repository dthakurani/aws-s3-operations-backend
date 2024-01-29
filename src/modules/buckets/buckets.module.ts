import { Module } from '@nestjs/common';
import { BucketsController } from './buckets.controller';
import { BucketsService } from './buckets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bucket } from '../../entities/bucket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bucket])],
  controllers: [BucketsController],
  providers: [BucketsService],
})
export class BucketsModule {}
