import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../../constants/environment.constant';
import { authEndpoint } from '../../constants/endpoints/auth.endpoint';
import { AuthService } from '../../shared/classes/auth.service';
import { StrategyNameEnum } from '../../shared/enums/strategy-name.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  StrategyNameEnum.Google,
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const googleOauthConfig = environmentConstant.oauth.google;
    const host = configService.get(environmentConstant.server.host);
    const port = configService.get(environmentConstant.server.port);

    super({
      clientID: configService.get(googleOauthConfig.clientId),
      clientSecret: configService.get(googleOauthConfig.secret),
      callbackURL: `${host}:${port}/${authEndpoint.default}/${authEndpoint.google.redirect}`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string, // Это действительно необходимые поля, без них не отрабатывает
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    try {
      const result = await this.authService.handleAuthentication(profile);
      done(null, result);
    } catch (err) {
      done(err, null);
    }
  }
}
