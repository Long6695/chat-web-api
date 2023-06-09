import { User } from 'src/entities/user.entity';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

export interface UserServiceInterface {
  create(userDto: CreateUserDto): Promise<User>;

  findOne(filterCondition: FindOneOptions<User>): Promise<User>;
}
