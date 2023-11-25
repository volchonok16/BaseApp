import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from '../shared/enums/strategy-name.enum';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(StrategyName.Google) {}
