import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { RegistrationDto } from '../../../../modules/auth/dto/registration.dto';
import bcrypt from 'bcrypt';
import { DeviceEntity } from './device.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  login: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ length: 30 })
  createdAt: string = new Date().toISOString();

  @OneToMany(() => DeviceEntity, (d) => d.user)
  devices: DeviceEntity[];

  @ManyToMany(() => RoleEntity, (r) => r.user)
  @JoinTable({ name: 'user_role' })
  roles: RoleEntity[];

  static async create(data: RegistrationDto): Promise<UserEntity> {
    const result = Object.assign(new UserEntity(), data);
    result.passwordHash = await bcrypt.hash(data.password, 10);

    return result;
  }
}
