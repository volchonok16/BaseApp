import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { authEndpoint } from '../../common/constants/endpoints/auth.endpoint';
import {
  ApiAuthenticateEmail,
  ApiLogin,
  ApiOAuthRedirect,
  ApiOAuthSignIn,
} from '../../common/documentations/auth-decorators';
import { LoginCommand } from './commands';
import { ResultNotificationFactory } from '../../common/shared/classes/result-notification.factory';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TCurrentUser } from '../../common/shared/types/current-user.type';
import { LoginDto } from './dto/login.dto';
import { Metadata } from '../../common/decorators/metadata.decorator';
import { TMetadata } from '../../common/shared/types/metadata.type';
import { TCreateToken } from '../../common/shared/types/create-token.type';
import { EmailDto } from './dto/email.dto';
import { AuthenticateEmailCommand } from './commands/authenticate-email.command-handler';
import { PasswordView } from './views/password.view';
import {
  CheckCredentialGuard,
  GoogleAuthGuard,
  YandexAuthGuard,
} from '../../common/guards';
import { OAuthName } from '../../common/shared/enums/oauth-name.enum';

@Controller(authEndpoint.default)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(authEndpoint.login)
  @UseGuards(CheckCredentialGuard)
  @ApiLogin()
  async login(
    @CurrentUser() user: TCurrentUser,
    @Body() dto: LoginDto,
    @Metadata() meta: TMetadata,
  ): Promise<TCreateToken> {
    const notification = await this.commandBus.execute<
      LoginCommand,
      ResultNotificationFactory<TCreateToken>
    >(new LoginCommand({ meta, ...user }));
    return notification.getData();
  }

  @Post(authEndpoint.authenticateEmail)
  @HttpCode(HttpStatus.CREATED)
  @ApiAuthenticateEmail()
  async authenticateEmail(@Body() dto: EmailDto): Promise<PasswordView> {
    const result = await this.commandBus.execute<
      AuthenticateEmailCommand,
      ResultNotificationFactory
    >(new AuthenticateEmailCommand(dto));
    return result.getData();
  }

  @Get(authEndpoint.google.signIn)
  @UseGuards(GoogleAuthGuard)
  @ApiOAuthSignIn(OAuthName.Google)
  async googleAuth() {}

  @Get(authEndpoint.google.redirect)
  @UseGuards(GoogleAuthGuard)
  @ApiOAuthRedirect(OAuthName.Google)
  async googleAuthRedirect(
    @Metadata() meta: TMetadata,
    @CurrentUser() user: TCurrentUser,
  ) {
    const notification = await this.commandBus.execute<
      LoginCommand,
      ResultNotificationFactory<TCreateToken>
    >(new LoginCommand({ meta, ...user }));
    return notification.getData();
  }

  @Get(authEndpoint.yandex.signIn)
  @UseGuards(YandexAuthGuard)
  @ApiOAuthSignIn(OAuthName.Yandex)
  async yandexAuth() {}

  @Get(authEndpoint.yandex.redirect)
  @UseGuards(YandexAuthGuard)
  @ApiOAuthRedirect(OAuthName.Yandex)
  async yandexOauth(
    @Metadata() meta: TMetadata,
    @CurrentUser() user: TCurrentUser,
  ) {
    const notification = await this.commandBus.execute<
      LoginCommand,
      ResultNotificationFactory<TCreateToken>
    >(new LoginCommand({ meta, ...user }));
    return notification.getData();
  }
}
