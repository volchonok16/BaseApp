import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthName } from '../shared/enums/oauth-name.enum';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(OAuthName.Google) {}
