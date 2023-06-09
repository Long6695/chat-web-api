import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
