import { RegistrationDto } from '../dto/registration.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { AuthRepository } from '../repositories/auth.repositories';
import { BadRequestException } from '@nestjs/common';
import { UserEntity } from '../../../common/providers/postgres/entities';

export class RegistrationCommand {
  constructor(public readonly dto: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  extends BaseNotificationUseCase<
    RegistrationCommand,
    { email: string; password: string } // вариант для тестов, обработке на юае не подлежит
  >
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {
    super();
  }

  async executeUseCase({
    dto,
  }: RegistrationCommand): Promise<{ email: string; password: string }> {
    const emailExists = await this.authQueryRepository.emailExists(dto.email);
    if (emailExists) throw new BadRequestException(`Email already exists`);

    const { user, password } = await UserEntity.create(dto);
    await this.authRepository.saveUser(user);

    // TODO добавить отправление письма с сгенерированным паролем

    return { email: dto.email, password };
  }
}
