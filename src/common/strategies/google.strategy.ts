import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../constants/environment.constant';
import { UserEntity } from '../providers/postgres/entities';
import { AuthRepository } from '../../modules/auth/repositories/auth.repositories';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {
    super({
      clientID: configService.get(environmentConstant.auth.googleClientId),
      clientSecret: configService.get(environmentConstant.auth.googleSecret),
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { emails } = profile;
      const email = emails[0].value;

      let user = await this.authRepository.getUserByEmail(email);
      if (!user) {
        user = await UserEntity.create({ email });
        await this.authRepository.saveUser(user);
      }

      done(null, { userId: user.id, roles: user.roles });
    } catch (err) {
      done(err);
    }
  }
}
