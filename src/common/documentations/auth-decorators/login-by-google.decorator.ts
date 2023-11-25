import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { settings } from '../../configurations/settings.config';
import { LoginView } from '../../../modules/auth/views/login.view';

export function ApiGoogleAuth() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary:
        'Логин пользователя через Google (OAuth2) (выбор google аккаунта)',
    }),
    ApiCreatedResponse({
      description: `Эндпоинт, перенаправляющий на логинизацию через Google почту`,
    }),
  );
}

export function ApiGoogleAuthRedirect() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary:
        'Логин пользователя через Google (OAuth2) (непосредственный вход в систему)',
    }),
    ApiCreatedResponse({
      description: `Вернет в "теле" accessToken, который заекспарится через ${settings.ttl.accessToken} и refreshToken в куки (${settings.ttl.refreshToken})`,
      type: LoginView,
    }),
  );
}
