import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../repositories/auth.repositories';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import bcrypt from 'bcrypt';
import { RegistrationDto } from '../dto/registration.dto';
import { generatePassword } from '../../../common/shared/utils/generate-password.utils';

export class CreateNewPasswordCommand {
  constructor(public dto: RegistrationDto) {}
}

@CommandHandler(CreateNewPasswordCommand)
export class CreateNewPasswordCommandHandler
  extends BaseNotificationUseCase<
    CreateNewPasswordCommand,
    { email: string; password: string }
  >
  implements ICommandHandler<CreateNewPasswordCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {
    super();
  }

  async executeUseCase(
    command: CreateNewPasswordCommand,
  ): Promise<{ email: string; password: string }> {
    const user = await this.authQueryRepository.getUserViaEmail(
      command.dto.email,
    );
    if (user) {
      const password = generatePassword(16);
      user.passwordHash = await bcrypt.hash(password, 10);

      await this.authRepository.createUser(user);

      // TODO добавить отправление письма с сгенерированным паролем

      return { email: command.dto.email, password };
    }
  }
}
