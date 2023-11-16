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

  async getUserViaEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async emailExists(email: string): Promise<string | null> {
    const isExists = await this.userRepository.exist({ where: { email } });
    return isExists ? 'email' : null;
  }

  async loginExists(login: string): Promise<string | null> {
    const isExists = await this.userRepository.exist({ where: { login } });
    return isExists ? 'login' : null;
  }
}
