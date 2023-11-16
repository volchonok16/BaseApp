import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegistrationDto } from '../../../modules/auth/dto/registration.dto';
import { ErrorResult } from '../../shared/classes/error.view';

export function ApiRegistration() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Регистрация нового пользователя в системе' }),
    ApiBody({
      type: RegistrationDto,
      required: true,
    }),
    ApiNoContentResponse({
      description: 'Новый пользователь успешно создан',
    }),
    ApiBadRequestResponse({
      description:
        'Если переданные данные не соответствуют формату dto или если почта или логин уже есть в системе',
      type: ErrorResult,
    }),
  );
}
