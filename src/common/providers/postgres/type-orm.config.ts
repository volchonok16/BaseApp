import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { entities } from './entities';
import { environmentConstant } from '../../constants/environment.constant';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { configService } = this;

    return {
      type: 'postgres',
      host: configService.get(environmentConstant.db.host),
      port: Number(configService.get(environmentConstant.db.port)),
      username: configService.get(environmentConstant.db.user),
      password: configService.get(environmentConstant.db.password),
      database: configService.get(environmentConstant.db.name),
      entities: [...entities],
      synchronize: true,
      ssl: true,
    };
  }
}
