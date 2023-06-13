import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { ProfileRepositoryInterface } from 'src/repositories//interfaces/profile.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
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
