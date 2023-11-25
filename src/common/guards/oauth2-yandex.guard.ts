import {AuthGuard} from "@nestjs/passport";
import {StrategyName} from "../shared/enums/strategy-name.enum";
import {Injectable} from "@nestjs/common";

@Injectable()
export class YandexAuthGuard extends  AuthGuard(StrategyName.Yandex) {}