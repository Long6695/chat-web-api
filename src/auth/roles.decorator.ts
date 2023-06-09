import { SetMetadata } from '@nestjs/common';
import { RoleEnumType } from 'src/entities/user.entity';

export const HasRoles = (...roles: RoleEnumType[]) =>
  SetMetadata('roles', roles);
