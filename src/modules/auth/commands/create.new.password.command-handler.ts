import { NewPasswordDto } from '../dto/newPassword.dto';
import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { IdView } from '../views/id.view';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../repositories/auth.repositories';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import bcrypt from 'bcrypt';

export class CreateNewPasswordCommand {
  constructor(
    public userId: string,
    public dto: NewPasswordDto,
  ) {}
}

@CommandHandler(CreateNewPasswordCommand)
export class CreateNewPasswordCommandHandler
  extends BaseNotificationUseCase<CreateNewPasswordCommand, IdView>
  implements ICommandHandler<CreateNewPasswordCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {
    super();
  }

  async executeUseCase(command: CreateNewPasswordCommand): Promise<IdView> {
    const user = await this.authQueryRepository.getUserViaId(command.userId);
    user.passwordHash = await bcrypt.hash(command.dto.password, 10);
    return this.authRepository.createUser(user);
  }
}
