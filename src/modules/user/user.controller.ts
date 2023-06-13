import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';

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
  public async me(@Req() req) {
    return this.userService.findOne({
      where: { id: req.user.id },
      relations: ['profile'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
