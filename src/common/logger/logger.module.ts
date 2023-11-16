import { Module } from '@nestjs/common';
import LogsService from './application/logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../providers/postgres/database.module';
import { CustomLogger } from './customLogger';
import { LogEntity } from '../providers/postgres/entities/log.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([LogEntity])],
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger],
})
export class LoggerModule {}
