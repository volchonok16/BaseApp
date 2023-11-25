import { AuthGuard } from '@nestjs/passport';
import { OAuthName } from '../shared/enums/oauth-name.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class YandexAuthGuard extends AuthGuard(OAuthName.Yandex) {}
