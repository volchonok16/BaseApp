import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import { environmentConstant } from '../constants/environment.constant';
import { ConfigService } from '@nestjs/config';
import LogsService from './application/logs.service';
import { EnvironmentsEnum } from '../shared/enums/environments.enum';
import { getLogLevels } from './getLogLevels';
import { CreateLogDto } from './dto/createLog.dto';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly logsService: LogsService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
    logsService: LogsService,
  ) {
    const environment = configService.get(environmentConstant.environment);

    super(context, {
      ...options,
      logLevels: getLogLevels(environment === EnvironmentsEnum.Developer),
    });

    this.logsService = logsService;
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);

    this.logsService.createLog(
      CreateLogDto.create({
        message,
        context,
        level: 'log',
      }),
    );
  }

  error(message: string, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);

    this.logsService.createLog(
      CreateLogDto.create({
        message,
        context,
        level: 'error',
      }),
    );
  }

  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);

    this.logsService.createLog(
      CreateLogDto.create({
        message,
        context,
        level: 'error',
      }),
    );
  }
  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    this.logsService.createLog(
      CreateLogDto.create({
        message,
        context,
        level: 'error',
      }),
    );
  }
  verbose(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    this.logsService.createLog(
      CreateLogDto.create({
        message,
        context,
        level: 'error',
      }),
    );
  }
}
