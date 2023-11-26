import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../modules/auth/repositories/auth.repositories';
import { UserEntity } from '../../providers/postgres/entities';
import { LoginDto } from '../../../modules/auth/dto/login.dto';
import { AuthQueryRepository } from '../../../modules/auth/repositories/auth.query-repository';
import * as bcrypt from 'bcrypt';
import { TCurrentUser } from '../types/current-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {}

  async handleAuthentication(profile: any): Promise<any> {
    try {
      const { emails } = profile;
      const email = emails[0].value;

      let user = await this.authRepository.getUserByEmail(email);
      if (!user) {
        user = await UserEntity.create(email);
        await this.authRepository.saveUser(user);
      }

      return { userId: user.id, roles: user.roles };
    } catch (err) {
      throw err;
    }
  }

  async checkCredentials(dto: LoginDto): Promise<TCurrentUser | null> {
    const user = await this.authQueryRepository.findUserViaEmail(dto.email);

    if (
      !user ||
      !(await this.isCorrectPassword(dto.password, user.passwordHash))
    )
      return null;

    return { userId: user.id, roles: user.roles };
  }

  private async isCorrectPassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}
