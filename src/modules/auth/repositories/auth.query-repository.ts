import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../common/providers/postgres/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserViaEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }
}
