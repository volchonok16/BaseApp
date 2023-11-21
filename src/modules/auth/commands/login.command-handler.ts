import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BaseNotificationUseCase } from '../../../common/shared/classes/base-notification.use-case';
import { WithClientMeta } from '../../../common/shared/types/with-client-meta.type';
import { TCurrentUser } from '../../../common/shared/types/current-user.type';
import { LoginView } from '../views/login.view';
import { AuthRepository } from '../repositories/auth.repositories';
import { TokensFactory } from '../../../common/shared/classes/token.factory';
import { DeviceEntity } from '../../../common/providers/postgres/entities';
import { environmentConstant } from '../../../common/constants/environment.constant';
import { TCreateToken } from '../../../common/shared/types/create-token.type';

export class LoginCommand {
  constructor(public readonly dto: WithClientMeta<TCurrentUser>) {}
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler
  extends BaseNotificationUseCase<LoginCommand, TCreateToken>
  implements ICommandHandler<LoginCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenFactory: TokensFactory,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }
  async executeUseCase({ dto }: LoginCommand): Promise<TCreateToken> {
    const tokens = await this.tokenFactory.getPairTokens(dto.userId);
    const createdAt = await this.getCreatedAt(tokens.accessToken);

    const newDevice = DeviceEntity.create(dto, createdAt);
    await this.authRepository.createDevice(newDevice);

    return { ...tokens };
  }

  private getCreatedAt(token: string): Promise<number> {
    const { iat } = this.jwtService.verify(token, {
      secret: this.configService.get(environmentConstant.secret.accessToken),
    });
    return iat;
  }
}
