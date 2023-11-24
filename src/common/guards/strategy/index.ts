import { YandexStrategy } from './yandex-oauth.strategy';
import { JwtStrategy } from './jwt.strategy';

export const strategy = [JwtStrategy, YandexStrategy];
