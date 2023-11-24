import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../../constants/environment.constant';
import { StrategyName } from '../../shared/enums/strategy-name.enum';

@Injectable()
export class YandexStrategy extends PassportStrategy(
  Strategy,
  StrategyName.Yandex,
) {
  constructor(private configService: ConfigService) {
    const yandexOauthConfig = environmentConstant.oauth.yandex;
    super({
      clientID: configService.get(yandexOauthConfig.clientId),
      clientSecret: configService.get(yandexOauthConfig.secret),
      callbackURL: configService.get(yandexOauthConfig.clientId),
    });
  }

  async validate(
    accessToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    const { id, emails } = profile;

    const user = {
      userId: id,
      email: emails[0].value,
      accessToken,
    };

    done(null, user);
  }
}
