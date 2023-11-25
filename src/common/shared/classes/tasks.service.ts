import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthRepository } from '../../../modules/auth/repositories/auth.repositories';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly authRepository: AuthRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteNotLoggedInUsers() {
    //delete all users who didn't log in during the day after registration
    const count = await this.authRepository.deleteNotLoggedInUsers();

    this.logger.debug(
      `The  number of deleted users who have not logged in: ${count}`,
    );
  }
}
