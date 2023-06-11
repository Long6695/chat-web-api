import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  create(userId: string) {
    try {
      const profile = this.profileRepository.create({
        userId,
      });
      return this.profileRepository.save(profile);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async find(userId: string) {
    try {
      const profile = await this.profileRepository.findWithRelation({
        where: { userId },
      });
      if (!profile) {
        throw new HttpException(
          'User with that email has not registered',
          HttpStatus.BAD_REQUEST,
        );
      }
      return profile;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(updateProfileDto: UpdateProfileDto, userId: string) {
    try {
      const userProfile = await this.find(userId);
      return this.profileRepository.update(userProfile.id, updateProfileDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
