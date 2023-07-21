import * as bcrypt from 'bcryptjs';
import Model from 'src/entities/model.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Group } from './group.entity';

export enum RoleEnumType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class User extends Model {
  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType;

  @Column({
    default: 'default.png',
  })
  photo: string;

  @Column({
    nullable: true,
  })
  hashRT: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isReported: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBlocked: boolean;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Group, (group) => group.user)
  groups: Group[];

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
