import { IsEnum } from 'class-validator';
import { RoleEnumType } from 'src/entities/user.entity';

export class RoleUpdateDto {
  @IsEnum(RoleEnumType)
  role: RoleEnumType;
}
