import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TCurrentUser } from '../shared/types/current-user.type';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): TCurrentUser | null => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      return null;
    }

    return request.user;
  },
);
