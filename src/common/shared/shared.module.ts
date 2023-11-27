import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { tokenTimeLifeToMilliseconds } from './utils/token-time-life-to-second.util';
import { environmentConstant } from '../constants/environment.constant';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        ttl: tokenTimeLifeToMilliseconds(
          configService.get(environmentConstant.ttl.accessToken),
        ),
      }),
    }),
    JwtModule.register({ global: true }),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
  ],
})
export class SharedModule {}
