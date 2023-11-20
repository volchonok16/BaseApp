import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ErrorResult } from "../../shared/classes/error.view";
import { NewPasswordDto } from "../../../modules/auth/dto/newPassword.dto";

export function ApiNewPassword() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Смена пароля' }),
    ApiBody({
      type: NewPasswordDto,
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
