import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TMetadata } from '../shared/types/metadata.type';

export const Metadata = createParamDecorator(
  (data: string, ctx: ExecutionContext): TMetadata => {
    const request = ctx.switchToHttp().getRequest();

    return {
      ipAddress: request.ip,
      title: request.headers['user-agent'],
    };
  },
);
