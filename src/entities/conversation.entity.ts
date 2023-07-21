import { Column, Entity, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Message } from './message.entity';
import { Group } from './group.entity';

@Entity('conversation')
export class Conversation extends Model {
  @Column({
    type: 'char',
    nullable: true,
  })
  name: string;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @OneToMany(() => Group, (group) => group.conversation)
  groups: Group[];
}
