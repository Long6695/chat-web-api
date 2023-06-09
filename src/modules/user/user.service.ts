import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { FindOneOptions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityId } from 'typeorm/repository/EntityId';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.name = userDto.name;
      user.email = userDto.email;
      user.password = userDto.password;
      return await this.userRepository.save(user);
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findOne(filterCondition: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findByCondition(filterCondition);
  }

  public async update(
    target: EntityId,
    partialEntity: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    return this.userRepository.update(target, partialEntity);
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ) {
    const user = await this.findOne({ where: { id: userId } });

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashRT,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
    return null;
  }
}
