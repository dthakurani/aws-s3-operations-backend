export interface BucketObjectInterface {
  id?: string;
  name: string;
  bucket_id: string;
  mime_type: string;
  size: number;
  data: Buffer;
  metadata: object;
  is_latest_version: boolean;
}
