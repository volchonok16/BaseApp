import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { entities } from './entities';
import { environmentConstant } from '../../constants/environment.constant';
config();

export default new DataSource({
  type: 'postgres',
  host: process.env[`${environmentConstant.db.host}`],
  port: +process.env[`${environmentConstant.db.port}`],
  username: process.env[`${environmentConstant.db.user}`],
  password: process.env[`${environmentConstant.db.password}`],
  database: process.env[`${environmentConstant.db.name}`],
  entities: [...entities],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
