import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogEntity } from '../../providers/postgres/entities/log.entity';
import { CreateLogDto } from '../dto/createLog.dto';

@Injectable()
export default class LogsService {
  constructor(
    @InjectRepository(LogEntity) private logsRepository: Repository<LogEntity>,
  ) {}

  async createLog(log: CreateLogDto) {
    const newLog = await this.logsRepository.create(log);
    await this.logsRepository.save(newLog, { data: { isCreatingLogs: true } });
    return newLog;
  }
}
