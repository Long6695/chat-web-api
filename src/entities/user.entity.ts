import * as bcrypt from 'bcryptjs';
import Model from 'src/entities/model.entity';
import { Profile } from 'src/entities/profile.entity';
import { BeforeInsert, Column, Entity, Index, OneToOne } from 'typeorm';

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
