import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/Conversation.entity';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { Repository } from 'typeorm';
import { ConversationRepositoryInterface } from './interfaces/conversation.repository.interface';

@Injectable()
export class ConversationRepository
  extends BaseAbstractRepository<Conversation>
  implements ConversationRepositoryInterface
{
  constructor(
    @InjectRepository(Conversation)
    readonly ConversationRepository: Repository<Conversation>,
  ) {
    super(ConversationRepository);
  }
}
