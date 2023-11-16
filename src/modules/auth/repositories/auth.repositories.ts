import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeviceEntity,
  UserEntity,
} from '../../../common/providers/postgres/entities';
import { IdView } from '../views/id.view';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  async createUser(data: UserEntity): Promise<IdView> {
    const { id } = await this.userRepository.save(data);

    return { id };
  }

  async createDevice(device: DeviceEntity): Promise<DeviceEntity> {
    return this.deviceRepository.save(device);
  }
}
