import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { Repository } from 'typeorm';
import { MessageRepositoryInterface } from './interfaces/message.repository.interface';

@Injectable()
export class MessageRepository
  extends BaseAbstractRepository<Message>
  implements MessageRepositoryInterface
{
  constructor(
    @InjectRepository(Message)
    readonly MessageRepository: Repository<Message>,
  ) {
    super(MessageRepository);
  }
}
