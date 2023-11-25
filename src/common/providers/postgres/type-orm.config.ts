import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { entities } from './entities';
import { environmentConstant } from '../../constants/environment.constant';
import { EnvironmentsEnum } from '../../shared/enums/environments.enum';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { configService } = this;
    const environment: EnvironmentsEnum = configService.get(
      environmentConstant.environment,
    );
    const dbConfig = environmentConstant.db[environment];

    return {
      type: 'postgres',
      host: configService.get(dbConfig.host),
      port: Number(configService.get(environmentConstant.db.port)),
      username: configService.get(dbConfig.user),
      password: configService.get(dbConfig.password),
      database: configService.get(dbConfig.name),
      entities: [...entities],
      synchronize: true,
      ssl: dbConfig.ssl,
    };
  }
}
