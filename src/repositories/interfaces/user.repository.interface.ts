import { User } from 'src/entities/user.entity';
import { BaseInterfaceRepository } from 'src/repositories/interfaces/base.interface.repository';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;
