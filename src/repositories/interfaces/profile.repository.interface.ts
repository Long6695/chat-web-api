import { Profile } from 'src/entities/profile.entity';
import { BaseInterfaceRepository } from 'src/repositories/interfaces/base.interface.repository';

export type ProfileRepositoryInterface = BaseInterfaceRepository<Profile>;
