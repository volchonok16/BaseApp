import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../modules/auth/repositories/auth.repositories';
import { UserEntity } from '../../providers/postgres/entities';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

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
}
