import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BucketObjectsService } from './bucket-objects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateBucketObjectDto,
  FindOneBucketObjectDto,
} from './bucket-objects.dto';

@Controller('s3/buckets/:bucketName/objects')
export class BucketObjectsController {
  constructor(private bucketObjectsService: BucketObjectsService) {}

  @Put()
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('file'))
  put(
    @Param('bucketName') bucketName: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateBucketObjectDto,
  ) {
    return this.bucketObjectsService.put(bucketName, file, body);
  }

  @Get(':name')
  findOne(
    @Param('bucketName') bucketName: string,
    @Param('name') objectName: string,
    @Query() query: FindOneBucketObjectDto,
  ) {
    return this.bucketObjectsService.findOne(bucketName, objectName, query);
  }

  @Delete(':name')
  delete(
    @Param('bucketName') bucketName: string,
    @Param('name') objectName: string,
  ) {
    return this.bucketObjectsService.delete(bucketName, objectName);
  }

  @Get()
  findAll(@Param('bucketName') bucketName: string) {
    return this.bucketObjectsService.findAll(bucketName);
  }
}
