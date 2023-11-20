import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { authEndpoint } from '../../common/constants/endpoints/auth.endpoint';
import {
  ApiLogin,
  ApiRegistration,
} from '../../common/documentations/auth-decorators';
import { RegistrationDto } from './dto/registration.dto';
import { IdView } from './views/id.view';
import { LoginCommand, RegistrationCommand } from './commands';
import { ResultNotificationFactory } from '../../common/shared/classes/result-notification.factory';
import { CheckCredentialGuard } from '../../common/guards/check-credential.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TCurrentUser } from '../../common/shared/types/current-user.type';
import { LoginDto } from './dto/login.dto';
import { Metadata } from '../../common/decorators/metadata.decorator';
import { TMetadata } from '../../common/shared/types/metadata.type';
import { TCreateToken } from '../../common/shared/types/create-token.type';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard';
import { NewPasswordDto } from './dto/newPassword.dto';
import { CreateNewPasswordCommand } from './commands/create.new.password.command-handler';
import { ApiNewPassword } from '../../common/documentations/auth-decorators/new.password.decorator';

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
    const notification = await this.commandBus.execute(
      new LoginCommand({ meta, ...user }),
    );
    return notification.getData();
  }

  @Post(authEndpoint.registration)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiRegistration()
  async registration(@Body() dto: RegistrationDto): Promise<void> {
    await this.commandBus.execute<
      RegistrationCommand,
      ResultNotificationFactory<IdView>
    >(new RegistrationCommand(dto));
    return;
  }

  @Post(authEndpoint.passwordRecovery)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RefreshTokenGuard)
  @ApiNewPassword()
  async passwordRecovery(@Req() req, @Body() dto: NewPasswordDto):Promise<void> {
    await this.commandBus.execute<
      CreateNewPasswordCommand,
      ResultNotificationFactory<IdView>
    >(new CreateNewPasswordCommand(req.user.userId, dto));
    return;
  }
}
