import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EmailDto } from '../../../modules/auth/dto/email.dto';
import { PasswordView } from '../../../modules/auth/views/password.view';

export function ApiAuthenticateEmail() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Логин/регистрация пользователя через почту' }),
    ApiBody({ type: EmailDto }),
    ApiCreatedResponse({
      description: `При регистрации пользователя вернет в "теле" его пароль. При логинизации null `,
      type: PasswordView,
    }),
  );
}
