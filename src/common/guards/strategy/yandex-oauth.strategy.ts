import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../../constants/environment.constant';
import { OAuthName } from '../../shared/enums/oauth-name.enum';
import { authEndpoint } from '../../constants/endpoints/auth.endpoint';
import { AuthService } from '../../shared/classes/auth.service';

@Injectable()
export class YandexStrategy extends PassportStrategy(
  Strategy,
  OAuthName.Yandex,
) {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    const yandexOauthConfig = environmentConstant.oauth.yandex;
    const host = configService.get(environmentConstant.server.host);
    const port = configService.get(environmentConstant.server.port);

    super({
      clientID: configService.get(yandexOauthConfig.clientId),
      clientSecret: configService.get(yandexOauthConfig.secret),
      callbackURL: `${host}:${port}/${authEndpoint.default}/${authEndpoint.yandex.redirect}`,
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
