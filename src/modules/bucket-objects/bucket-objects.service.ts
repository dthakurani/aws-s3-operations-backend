import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../../entities/bucket.entity';
import { BucketObject } from '../../entities/bucket-object.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import { CreateBucketObjectDto } from './bucket-objects.dto';
import { BucketObjectInterface } from './bucket-objects.interface';
import { CustomException } from '../../utilities/custom-exception.utility';

@Injectable()
export class BucketObjectsService {
  constructor(
    @InjectRepository(Bucket)
    private bucketRepository: Repository<Bucket>,

    @InjectRepository(BucketObject)
    private bucketObjectRepository: Repository<BucketObject>,
  ) {}

  async put(
    bucketName: string,
    bucketObject: any,
    body: CreateBucketObjectDto,
  ) {
    let bucketObjectPayload: BucketObjectInterface;
    let whereQuery;

    const bucketFound = await this.bucketRepository.findOne({
      where: { name: ILike(bucketName) },
    });

    if (!bucketFound) {
      throw new CustomException(
        'Bucket with this name not exists',
        'name',
        HttpStatus.NOT_FOUND,
      );
    }

    bucketObjectPayload = {
      name: bucketObject.originalname,
      mime_type: bucketObject.mimetype,
      size: bucketObject.size,
      data: bucketObject.buffer,
      metadata: body.metadata,
      bucket_id: bucketFound.id,
      is_latest_version: bucketFound.versioning ? true : null,
    };

    whereQuery = {
      bucket_id: bucketFound.id,
      name: bucketObject.originalname,
      mime_type: bucketObject.mimetype,
      is_latest_version: bucketFound.versioning ? true : IsNull(),
    };

    const bucketObjectFound = await this.bucketObjectRepository.findOne({
      where: whereQuery,
    });

    if (bucketObjectFound && !bucketFound.versioning) {
      await this.bucketObjectRepository.update(
        { id: bucketObjectFound.id },
        bucketObjectPayload,
      );
    } else if (bucketObjectFound && bucketFound.versioning) {
      await this.bucketObjectRepository.update(
        { id: bucketObjectFound.id },
        { is_latest_version: false },
      );

      await this.bucketObjectRepository.save(bucketObjectPayload);
    } else {
      await this.bucketObjectRepository.save(bucketObjectPayload);
    }
  }
}
