import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity('group')
export class Group extends Model {
  @Column({
    type: 'date',
    nullable: true,
  })
  joinedDateTime: Date;
  @Column({
    type: 'date',
    nullable: true,
  })
  leftDateTime: Date;

  @ManyToOne(() => Conversation, (conversation) => conversation.groups)
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.groups)
  user: User;
}
