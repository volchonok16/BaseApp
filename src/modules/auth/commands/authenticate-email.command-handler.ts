import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { IdView } from '../views/id.view';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { AuthRepository } from '../repositories/auth.repositories';
import { UserEntity } from '../../../common/providers/postgres/entities';
import { EmailDto } from '../dto/email.dto';
import { PasswordView } from '../views/password.view';
import { generatePassword } from '../../../common/shared/utils/generate-password.utils';

export class AuthenticateEmailCommand {
  constructor(public readonly dto: EmailDto) {}
}

@CommandHandler(AuthenticateEmailCommand)
export class AuthenticateEmailCommandHandler
  extends BaseNotificationUseCase<AuthenticateEmailCommand, PasswordView>
  implements ICommandHandler<AuthenticateEmailCommand>
{
  constructor(private readonly authRepository: AuthRepository) {
    super();
  }

  async executeUseCase({
    dto,
  }: AuthenticateEmailCommand): Promise<PasswordView> {
    // await this.checkEmailExists(dto.email);
    const emailExists = await this.authRepository.emailExists(dto.email);
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
    const password = generatePassword(16);
    const user = await UserEntity.create({ email }, password);
    const { id } = await this.authRepository.saveUser(user);
    return { password, id };
  }
}
