import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { WithClientMeta } from '../../../shared/types/with-client-meta.type';
import { TCurrentUser } from '../../../shared/types/current-user.type';

@Entity({ name: 'device' })
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  title: string;

  @Column('uuid')
  userId: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => UserEntity, (u) => u.devices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  static create(
    data: WithClientMeta<TCurrentUser>,
    createdAt: number,
  ): DeviceEntity {
    return Object.assign(new DeviceEntity(), {
      ipAddress: data.meta.ipAddress,
      title: data.meta.title,
      userId: data.userId,
      createdAt,
    });
  }
}
