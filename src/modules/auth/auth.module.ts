import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { setCookiesInterceptorProvider } from '../../common/interceptos/set-cookie-interceptor/set-cookies-interceptor.provider';
import {
  DeviceEntity,
  UserEntity,
} from '../../common/providers/postgres/entities';
import { AUTH_COMMAND_HANDLERS } from './commands';
import { AuthRepository } from './repositories/auth.repositories';
import { AuthQueryRepository } from './repositories/auth.query-repository';
import { TokensFactory } from '../../common/shared/classes/token.factory';
import { AuthHandler } from './auth.handler';

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([DeviceEntity, UserEntity]),
  ],
  controllers: [AuthController, AuthHandler],
  providers: [
    AuthRepository,
    AuthQueryRepository,
    TokensFactory,
    setCookiesInterceptorProvider,
    ...AUTH_COMMAND_HANDLERS,
  ],
})
export class AuthModule {}
