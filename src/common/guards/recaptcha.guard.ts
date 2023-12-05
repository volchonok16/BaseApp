import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from '../constants/environment.constant';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();
    const recaptchaSecret = this.configService.get(
      environmentConstant.secret.recaptchaSecrete,
    );

    const { data } = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?response=${body.reCaptchaToken}&secret=${recaptchaSecret}`,
      { method: 'POST' },
    );

    if (!data.success) {
      throw new ForbiddenException(); //проверять дополнительно процент, что пользователь бот?
    }

    return true;
  }
}
