import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResult } from '../../shared/classes/error.view';
import { RegistrationDto } from '../../../modules/auth/dto/registration.dto';

export function ApiNewPassword() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Смена пароля' }),
    ApiBody({
      type: RegistrationDto,
      required: true,
    }),
    ApiNoContentResponse({
      description: 'Новый пароль успешно создан',
    }),
    ApiBadRequestResponse({
      description: 'Если переданные данные не соответствуют формату dto',
      type: ErrorResult,
    }),
  );
}
