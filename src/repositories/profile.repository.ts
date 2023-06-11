import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Profile } from 'src/entities/profile.entity';
import { ProfileRepositoryInterface } from './interfaces/profile.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileRepository
  extends BaseAbstractRepository<Profile>
  implements ProfileRepositoryInterface
{
  constructor(
    @InjectRepository(Profile)
    readonly ProfileRepository: Repository<Profile>,
  ) {
    super(ProfileRepository);
  }
}
