import { LogEntity } from './log.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';
import { DeviceEntity } from './device.entity';

export * from './device.entity';
export * from './log.entity';
export * from './user.entity';
export * from './role.entity';

export const entities = [DeviceEntity, LogEntity, RoleEntity, UserEntity];
