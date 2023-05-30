import { Entity, Column, Index, BeforeInsert, OneToOne } from 'typeorm';
import Model from './model.entity';
import bcrypt from 'bcryptjs';
import { Profile } from './profile.entity';

export enum RoleEnumType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class User extends Model {
  @Column()
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType.USER;

  @Column({
    default: 'default.png',
  })
  photo: string;

  @Column({
    default: false,
  })
  verified: boolean;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
