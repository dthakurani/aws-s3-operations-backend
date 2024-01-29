import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('bucket_object')
export class BucketObject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  bucket_id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  mime_type: string;

  @Column({ type: 'integer', nullable: false })
  size: number;

  @Column({ type: 'bytea', nullable: false })
  data: Buffer;

  @Column({ type: 'json', nullable: true })
  metadata: object;

  @Column({ type: 'boolean', nullable: true, default: null })
  is_latest_version: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
