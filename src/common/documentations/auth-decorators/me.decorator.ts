import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

export function ApiMe() {
  return applyDecorators(
    ApiTags('Catalogs'),
    ApiOperation({
      summary: 'Вернет данные о запрошенном каталоге',
      // description: `Доступные каталоги: ${catalogType.join(', ')}`,
    }),
    ApiBearerAuth('jwt'),
    ApiOkResponse({
      description: 'Данные успешно получены',
      //type: MeView,
    }),
    ApiOkResponse({
      description: 'Данные успешно получены',
      type: Error,
    }),
    ApiBadRequestResponse({ description: 'Не передано значение в "query"' }),
  );
}

//const catalogType: CatalogNameEnum[] = Object.values(CatalogNameEnum);
