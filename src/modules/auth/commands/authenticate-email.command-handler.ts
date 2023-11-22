import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { IdView } from '../views/id.view';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { AuthRepository } from '../repositories/auth.repositories';
import { UserEntity } from '../../../common/providers/postgres/entities';
import generator from 'generate-password';
import { EmailDto } from '../dto/email.dto';
import { PasswordView } from '../views/password.view';
import { Cron, CronExpression } from '@nestjs/schedule';

export class AuthenticateEmailCommand {
  constructor(public readonly dto: EmailDto) {}
}

@CommandHandler(AuthenticateEmailCommand)
export class AuthenticateEmailCommandHandler
  extends BaseNotificationUseCase<AuthenticateEmailCommand, PasswordView>
  implements ICommandHandler<AuthenticateEmailCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {
    super();
  }

  async executeUseCase({
    dto,
  }: AuthenticateEmailCommand): Promise<PasswordView> {
    // await this.checkEmailExists(dto.email);
    const emailExists = await this.authQueryRepository.emailExists(dto.email);
    if (!emailExists) {
      const { password, id } = await this.createNewUser(dto.email);
      console.log(id);
      //send email with pass
      //mailer.sendEmail(password, email)
      return { password };
    }
    return { password: null };
  }

  private async createNewUser(email: string): Promise<PasswordView & IdView> {
    const password = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
    });
    const newUser = await UserEntity.create({ email, password });
    const { id } = await this.authRepository.saveUser(newUser);
    return { password, id };
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async deleteNotLoggedInUsers() {
    //delete all users who didn't log in during the day after registration
    await this.authRepository.deleteNotLoggedInUsers();
  }
}
