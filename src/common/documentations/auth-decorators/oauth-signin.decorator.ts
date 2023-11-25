import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OAuthName } from '../../shared/enums/oauth-name.enum';

export function ApiOAuthSignIn(oauthName: OAuthName) {
  return applyDecorators(
    ApiTags('OAuth'),
    ApiOperation({
      summary: `Логин пользователя через "${oauthName}" (OAuth2) (выбор ${oauthName} аккаунта)`,
    }),
    ApiCreatedResponse({
      description: `Эндпоинт, перенаправляющий на логинизацию через ${oauthName} почту`,
    }),
  );
}
