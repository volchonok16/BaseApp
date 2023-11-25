import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthQueryRepository } from '../../../modules/auth/repositories/auth.query-repository';
import { OAuthName } from '../../shared/enums/oauth-name.enum';
import { environmentConstant } from '../../constants/environment.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, OAuthName.JWT) {
  constructor(
    private authQueryRepository: AuthQueryRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get(environmentConstant.secret.accessToken),
      ignoreExpiration: false,
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies['access_token'];
      },
    });
  }

  async validate(payload: any): Promise<any> {
    console.log(payload);
    const { email } = payload;
    const user = await this.authQueryRepository.getUserViaEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { userId: user.id, role: user.roles };
  }
}
