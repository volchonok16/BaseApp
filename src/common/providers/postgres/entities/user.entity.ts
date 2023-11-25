import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {RoleEntity} from './role.entity';
import bcrypt from 'bcrypt';
import {DeviceEntity} from './device.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  email: string;

  @Column({ nullable: true })
  passwordHash: string | null;

  @Column({ length: 30 })
  createdAt: string = new Date().toISOString();

  @Column({ nullable: true, default: false })
  isLoggedIn: boolean | null;

  @OneToMany(() => DeviceEntity, (d) => d.user)
  devices: DeviceEntity[];

  @ManyToMany(() => RoleEntity, (r) => r.user)
  @JoinTable({ name: 'user_role' })
  roles: RoleEntity[];

  static async create(
    email: string,
    password: string | null = null,
  ): Promise<UserEntity> {
    const result = Object.assign(new UserEntity(), { email });
    result.passwordHash = password ? await bcrypt.hash(password, 10) : null;

    return result;
  }
}
