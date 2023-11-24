import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { entities } from './entities';
import { environmentConstant } from '../../constants/environment.constant';

config();

const environment = environmentConstant.environment;

export default new DataSource({
  type: 'postgres',
  host: process.env[`${environmentConstant.db[environment].host}`],
  port: +process.env[`${environmentConstant.db.port}`],
  username: process.env[`${environmentConstant.db[environment].user}`],
  password: process.env[`${environmentConstant.db[environment].password}`],
  database: process.env[`${environmentConstant.db[environment].name}`],
  entities: [...entities],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
