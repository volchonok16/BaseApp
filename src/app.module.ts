import { Module } from '@nestjs/common';
import { LoggerModule } from './common/logger/logger.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './modules/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    ApiModule,
    LoggerModule,
  ],
})
export class AppModule {}
