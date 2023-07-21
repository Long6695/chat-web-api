import { Message } from 'src/entities/message.entity';
import { BaseInterfaceRepository } from 'src/repositories/interfaces/base.interface.repository';

export type MessageRepositoryInterface = BaseInterfaceRepository<Message>;
