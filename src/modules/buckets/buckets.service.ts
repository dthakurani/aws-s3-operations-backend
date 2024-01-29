import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBucketDto, FindAllBucketDto } from './buckets.dto';
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
  async create(body: CreateBucketDto) {
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

  async delete(name: string) {
    const bucketFound = await this.bucketRepository.findOne({
      where: { name: ILike(name) },
    });

    if (!bucketFound) {
      throw new CustomException(
        'Bucket with this name not exists',
        'name',
        HttpStatus.NOT_FOUND,
      );
    }

    this.bucketRepository.softRemove(bucketFound);
  }

  async findAll(query: FindAllBucketDto) {
    const { page, limit } = query;
    let skip = 0;

    if (page && limit) {
      skip = (page - 1) * limit;
    }

    const [buckets, count] = await Promise.all([
      this.bucketRepository.find({
        skip,
        take: limit,
        order: {
          created_at: 'DESC',
        },
      }),

      this.bucketRepository.count(),
    ]);

    return { buckets, count, page, limit };
  }
}
