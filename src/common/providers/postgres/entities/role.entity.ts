import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  title: string;

  @Column({ nullable: true, length: 200 })
  description: string;

  @Column({ nullable: true })
  privileges: string;

  @ManyToMany(() => UserEntity, (u) => u.roles)
  user: UserEntity;
}
