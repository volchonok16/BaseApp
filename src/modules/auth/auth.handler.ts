import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { messagePattern } from '../../common/constants/message-pattern.constant';
import { LoginCommand, RegistrationCommand } from './commands';
import { ResultNotificationFactory } from '../../common/shared/classes/result-notification.factory';
import { RegistrationDto } from './dto/registration.dto';
import { WithClientMeta } from '../../common/shared/types/with-client-meta.type';
import { TCurrentUser } from '../../common/shared/types/current-user.type';
import { TCreateToken } from '../../common/shared/types/create-token.type';

@Controller()
export class AuthHandler {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: messagePattern.registration })
  async registration(
    dto: RegistrationDto,
  ): Promise<{ email: string; password: string }> {
    const notification = await this.commandBus.execute<
      RegistrationCommand,
      ResultNotificationFactory<any>
    >(new RegistrationCommand(dto));
    return notification.getData();
  }

  @MessagePattern({ cmd: messagePattern.login })
  async login(dto: WithClientMeta<TCurrentUser>): Promise<TCreateToken> {
    const notification = await this.commandBus.execute<
      LoginCommand,
      ResultNotificationFactory<TCreateToken>
    >(new LoginCommand(dto));
    return notification.getData();
  }
}
