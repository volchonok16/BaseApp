import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../shared/classes/auth.service';
import { TCurrentUser } from '../../shared/types/current-user.type';
import { StrategyNameEnum } from '../../shared/enums/strategy-name.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  StrategyNameEnum.Local,
) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<TCurrentUser> {
    const user = await this.authService.checkCredentials({
      email,
      password,
    });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
