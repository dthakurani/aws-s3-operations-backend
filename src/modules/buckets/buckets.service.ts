import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBucketDto } from './buckets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../../entities/bucket.entity';
import { ILike, Repository } from 'typeorm';
import { CustomException } from '../../utilities/custom-exception.utility';

@Injectable()
export class BucketsService {
  constructor(
    @InjectRepository(Bucket)
    private bucketRepository: Repository<Bucket>,
  ) {}
  async create(body: CreateBucketDto): Promise<Bucket> {
    const bucketFound = await this.bucketRepository.findOne({
      where: { name: ILike(body.name) },
    });

    if (bucketFound) {
      throw new CustomException(
        'Bucket with this name already exists',
        'name',
        HttpStatus.CONFLICT,
      );
    }

    const bucket = await this.bucketRepository.save(body);

    return bucket;
  }
}