import Model from 'src/entities/model.entity';
import { Column, Entity } from 'typeorm';

@Entity('profile')
export class Profile extends Model {
  @Column({
    nullable: true,
  })
  firstName: string | '';

  @Column({
    nullable: true,
  })
  lastName: string | '';

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date | '';

  @Column({
    nullable: true,
  })
  phone: string | '';

  @Column({
    nullable: true,
  })
  country: string | '';

  @Column({
    nullable: true,
    length: 500,
  })
  description: string | '';

  @Column()
  userId: string;
}
