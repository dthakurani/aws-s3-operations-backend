import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BucketObjectsService } from './bucket-objects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBucketObjectDto } from './bucket-objects.dto';

@Controller('s3/buckets/:name/objects')
export class BucketObjectsController {
  constructor(private bucketObjectsService: BucketObjectsService) {}

  @Put()
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('file'))
  put(
    @Param('name') bucketName: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateBucketObjectDto,
  ) {
    return this.bucketObjectsService.put(bucketName, file, body);
  }
}
