import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyNameEnum } from '../shared/enums/strategy-name.enum';

@Injectable()
export class LocalAuthGuard extends AuthGuard(StrategyNameEnum.Local) {}
