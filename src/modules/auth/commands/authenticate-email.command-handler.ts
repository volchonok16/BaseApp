import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { IdView } from '../views/id.view';
import bcrypt from 'bcrypt';
import { AuthRepository } from '../repositories/auth.repositories';
import { UserEntity } from '../../../common/providers/postgres/entities';
import { EmailDto } from '../dto/email.dto';
import { PasswordView } from '../views/password.view';
import { generatePassword } from '../../../common/shared/utils/generate-password.utils';
import { EmailAdapters, EmailManager } from '../../../common/adapters/email';

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
    private readonly emailManager: EmailManager,
  ) {
    super();
  }

  async executeUseCase({
    dto,
  }: AuthenticateEmailCommand): Promise<PasswordView> {
    // await this.checkEmailExists(dto.email);
    const user = await this.authRepository.getUserByEmail(dto.email);
    if (!user) {
      const { password } = await this.createAndSaveNewUser(dto.email);

      this.emailManager.sendCompleteRegistrationMail(dto.email, password);

      return { password };
    }

    if (user.passwordHash === null) {
      //the case, when user login the first time just by email (not oauth2)
      const { password } = await this.saveNewPasswordHash(user);

      this.emailManager.sendCompleteRegistrationMail(dto.email, password);

      return { password };
    }

    return { password: null };
  }

  private async createAndSaveNewUser(
    email: string,
  ): Promise<PasswordView & IdView> {
    const password = generatePassword(16);
    const user = await UserEntity.create(email, password);
    const { id } = await this.authRepository.saveUser(user);
    return { password, id };
  }

  private async saveNewPasswordHash(user: UserEntity): Promise<PasswordView> {
    const password = generatePassword(16);
    user.passwordHash = await bcrypt.hash(password, 10);
    await this.authRepository.saveUser(user);
    return { password };
  }
}
