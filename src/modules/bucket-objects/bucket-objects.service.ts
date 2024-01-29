import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../../entities/bucket.entity';
import { BucketObject } from '../../entities/bucket-object.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import {
  CreateBucketObjectDto,
  FindOneBucketObjectDto,
} from './bucket-objects.dto';
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
    const objectName = bucketObject.originalname.replace(/[\s_]/g, '-');

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
      name: objectName,
      mime_type: bucketObject.mimetype,
      size: bucketObject.size,
      data: bucketObject.buffer,
      metadata: body.metadata,
      bucket_id: bucketFound.id,
      is_latest_version: bucketFound.versioning ? true : null,
    };

    whereQuery = {
      bucket_id: bucketFound.id,
      name: objectName,
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

  async findOne(
    bucketName: string,
    objectName: string,
    query: FindOneBucketObjectDto,
  ) {
    const whereQuery = query.version_id
      ? {
          id: query.version_id,
          name: ILike(objectName),
          bucket: {
            name: ILike(bucketName),
          },
        }
      : [
          {
            name: ILike(objectName),
            is_latest_version: true,
            bucket: {
              name: ILike(bucketName),
            },
          },
          {
            name: ILike(objectName),
            is_latest_version: IsNull(),
            bucket: {
              name: ILike(bucketName),
            },
          },
        ];

    const bucketObjectFound = await this.bucketObjectRepository.findOne({
      where: whereQuery,
      relations: ['bucket'],
    });

    if (!bucketObjectFound) {
      throw new CustomException(
        'The specified resource does not exist.',
        '',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      ...bucketObjectFound,
      data: bucketObjectFound.data.toString('base64url'),
    };
  }

  async delete(bucketName: string, objectName: string) {
    const bucketObjectFound = await this.bucketObjectRepository.findOne({
      where: [
        {
          name: ILike(objectName),
          is_latest_version: true,
          bucket: {
            name: ILike(bucketName),
          },
        },
        {
          name: ILike(objectName),
          is_latest_version: IsNull(),
          bucket: {
            name: ILike(bucketName),
          },
        },
      ],
      relations: ['bucket'],
    });

    if (!bucketObjectFound) {
      throw new CustomException(
        'The specified resource does not exist.',
        '',
        HttpStatus.NOT_FOUND,
      );
    }

    if (bucketObjectFound.bucket.versioning) {
      await this.bucketObjectRepository.update(
        { id: bucketObjectFound.id },
        { is_latest_version: false },
      );

      await this.bucketObjectRepository.save({
        name: bucketObjectFound.name,
        mime_type: bucketObjectFound.mime_type,
        size: bucketObjectFound.size,
        data: bucketObjectFound.data,
        metadata: bucketObjectFound.metadata,
        bucket_id: bucketObjectFound.bucket_id,
        is_latest_version: true,
        deleted_at: new Date(),
      });
    } else {
      await this.bucketObjectRepository.softRemove(bucketObjectFound);
    }
  }

  async findAll(bucketName: string) {
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

    const bucketObjects = await this.bucketObjectRepository.find({
      where: {
        is_latest_version: true,
        bucket: {
          name: ILike(bucketName),
        },
      },
      select: ['id', 'name', 'is_latest_version', 'metadata', 'mime_type'],
      order: {
        created_at: 'DESC',
      },
    });

    return bucketObjects;
  }
}
