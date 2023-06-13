import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepositoryInterface } from 'src/repositories/interfaces/user.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User)
    readonly UserRepository: Repository<User>,
  ) {
    super(UserRepository);
  }
}
