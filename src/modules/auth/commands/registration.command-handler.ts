import { RegistrationDto } from '../dto/registration.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { ResultNotificationFactory } from '../../../common/shared/classes/result-notification.factory';
import { IdView } from '../views/id.view';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { AuthRepository } from '../repositories/auth.repositories';
import { BadRequestException } from '@nestjs/common';
import { UserEntity } from '../../../common/providers/postgres/entities';
import { join } from 'path';

export class RegistrationCommand {
  constructor(public readonly dto: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  extends BaseNotificationUseCase<RegistrationCommand, IdView>
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {
    super();
  }

  async executeUseCase({ dto }: RegistrationCommand): Promise<IdView> {
    await this.checkFieldsExists(dto);

    const newUser = await UserEntity.create(dto);
    return this.authRepository.saveUser(newUser);
  }

  private async checkFieldsExists(dto: RegistrationDto): Promise<void> {
    const emailExists = this.authQueryRepository.emailExists(dto.email);
    const loginExists = this.authQueryRepository.loginExists(dto.login);

    const [email, login] = await Promise.all([emailExists, loginExists]);
    if (email || login) {
      const fieldsExists = [];
      if (email) fieldsExists.push(email);
      if (login) fieldsExists.push(login);
      throw new BadRequestException(
        `${fieldsExists.join(', ')} already exists`,
      );
    }
  }
}
