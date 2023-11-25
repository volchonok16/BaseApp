import { OAuthName } from '../../shared/enums/oauth-name.enum';
import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { settings } from '../../configurations/settings.config';
import { LoginView } from '../../../modules/auth/views/login.view';

export function ApiOAuthRedirect(oauthName: OAuthName) {
  return applyDecorators(
    ApiTags('OAuth'),
    ApiOperation({
      summary: `Логин пользователя через "${oauthName}" (OAuth2) (непосредственный вход в систему)`,
    }),
    ApiCreatedResponse({
      description: `Вернет в "теле" accessToken, который заекспарится через ${settings.ttl.accessToken} и refreshToken в куки (${settings.ttl.refreshToken})`,
      type: LoginView,
    }),
  );
}
