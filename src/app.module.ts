import { Module } from '@nestjs/common';
import { LoggerModule } from './common/logger/logger.module';
import { ApiModule } from './modules/api.module';
import { SharedModule } from './common/shared.module';

@Module({
  imports: [ApiModule, LoggerModule, SharedModule],
})
export class AppModule {}
