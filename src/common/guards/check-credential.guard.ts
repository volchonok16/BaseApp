import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthQueryRepository } from '../../modules/auth/repositories/auth.query-repository';
import bcrypt from 'bcrypt';

@Injectable()
export class CheckCredentialGuard implements CanActivate {
  constructor(private authQueryRepository: AuthQueryRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { email, password } = req.body;

      const user = await this.authQueryRepository.getUserViaEmail(email);

      const passwordEqual = await bcrypt.compare(password, user.passwordHash);
      if (!passwordEqual) throw Error();

      req.user = { userId: user.id, roles: user.roles };
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
