import { Module } from '@nestjs/common';
import { LoggerModule } from './common/logger/logger.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    LoggerModule,
  ],
})
export class AppModule {}
