import { Conversation } from 'src/entities/conversation.entity';
import { BaseInterfaceRepository } from 'src/repositories/interfaces/base.interface.repository';

export type ConversationRepositoryInterface =
  BaseInterfaceRepository<Conversation>;
