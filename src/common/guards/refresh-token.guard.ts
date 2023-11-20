import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthQueryRepository } from '../../modules/auth/repositories/auth.query-repository';
import { TokensFactory } from '../shared/classes/token.factory';
import { TokenTypeEnum } from '../shared/enums/tokens.enum';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private authQueryRepository: AuthQueryRepository,
    private tokensFactory: TokensFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { refreshToken } = req.cookies;
      const { userId } = await this.tokensFactory.checkToken(
        refreshToken,
        TokenTypeEnum.RefreshToken,
      );
      const user = await this.authQueryRepository.getUserViaId(userId);
      req.user = { userId: user.id, roles: user.roles };
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
