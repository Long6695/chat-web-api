import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Conversation } from './conversation.entity';

@Entity('message')
export class Message extends Model {
  @Column({
    type: 'char',
    nullable: true,
  })
  text: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  sentTime: Date;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
