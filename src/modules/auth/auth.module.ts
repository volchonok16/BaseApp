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
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from '../../common/shared/classes/tasks.service';

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([DeviceEntity, UserEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [
    AuthRepository,
    AuthQueryRepository,
    TokensFactory,
    TasksService,
    setCookiesInterceptorProvider,
    ...AUTH_COMMAND_HANDLERS,
  ],
})
export class AuthModule {}
