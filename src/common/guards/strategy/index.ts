import { YandexStrategy } from './yandex-oauth.strategy';
import { JwtStrategy } from './jwt.strategy';
import {GoogleStrategy} from "./google.strategy";

export const strategy = [GoogleStrategy, JwtStrategy, YandexStrategy];
