import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setCookiesInterceptorProvider } from '../../common/interceptos/set-cookie-interceptor/set-cookies-interceptor.provider';
import {
  DeviceEntity,
  UserEntity,
} from '../../common/providers/postgres/entities';
import { AUTH_COMMAND_HANDLERS } from './commands';
import { AuthRepository } from './repositories/auth.repositories';
import { AuthQueryRepository } from './repositories/auth.query-repository';
import { TokensFactory } from '../../common/shared/classes/token.factory';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from '../../common/shared/classes/tasks.service';
import { PassportModule } from '@nestjs/passport';
import { strategy } from '../../common/guards/strategy';
import { AuthService } from '../../common/shared/classes/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([DeviceEntity, UserEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    AuthQueryRepository,
    TokensFactory,
    TasksService,
    setCookiesInterceptorProvider,
    ...AUTH_COMMAND_HANDLERS,
    ...strategy,
  ],
  exports: [...strategy],
})
export class AuthModule {}
