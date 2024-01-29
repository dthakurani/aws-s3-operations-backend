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
  FindAllBucketObjectVersionsDto,
  FindAllBucketObjectsDto,
  FindOneBucketObjectDto,
} from './bucket-objects.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('s3/buckets/:bucketName/objects')
@ApiTags('Bucket Objects')
export class BucketObjectsController {
  constructor(private bucketObjectsService: BucketObjectsService) {}

  @Put()
  @HttpCode(204)
  @ApiOperation({ summary: 'Create a new bucket object' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  put(
    @Param('bucketName') bucketName: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateBucketObjectDto,
  ) {
    return this.bucketObjectsService.put(bucketName, file, body);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Find a bucket object' })
  findOne(
    @Param('bucketName') bucketName: string,
    @Param('name') objectName: string,
    @Query() query: FindOneBucketObjectDto,
  ) {
    return this.bucketObjectsService.findOne(bucketName, objectName, query);
  }

  @Delete(':name')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a bucket object' })
  delete(
    @Param('bucketName') bucketName: string,
    @Param('name') objectName: string,
  ) {
    return this.bucketObjectsService.delete(bucketName, objectName);
  }

  @Get()
  @ApiOperation({ summary: 'List all bucket objects' })
  findAll(
    @Param('bucketName') bucketName: string,
    @Query() query: FindAllBucketObjectsDto,
  ) {
    return this.bucketObjectsService.findAll(bucketName, query);
  }

  @Get(':name/versions')
  @ApiOperation({ summary: 'List bucket object all versions' })
  findAllVersions(
    @Param('bucketName') bucketName: string,
    @Param('name') objectName: string,
    @Query() query: FindAllBucketObjectVersionsDto,
  ) {
    return this.bucketObjectsService.findAllVersions(
      bucketName,
      objectName,
      query,
    );
  }
}
