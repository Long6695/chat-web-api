import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from 'src/modules/profile/dto/create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
