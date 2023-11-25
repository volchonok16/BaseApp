import { YandexStrategy } from './yandex-oauth.strategy';
import { GoogleStrategy } from './google.strategy';
import { LocalStrategy } from './local.strategy';

export const strategy = [GoogleStrategy, LocalStrategy, YandexStrategy];
