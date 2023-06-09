import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RoleEnumType, User } from 'src/entities/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { RegisterAuthDto } from 'src/modules/auth/dto/register-auth.dto';
import { RoleUpdateDto } from 'src/modules/auth/dto/role-update.dto';
import JwtRefreshGuard from 'src/modules/auth/guards/jwt-rt.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { LocalAuthGuard } from 'src/modules/auth/guards/local.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { HasRoles } from 'src/modules/auth/roles.decorator';
import { UserService } from 'src/modules/user/user.service';
import { ReqTypes } from 'src/modules/auth/interface/auth-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @Req() req: ReqTypes,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = req;
    await this.authService.login(user, response);
    return {
      status: 'success',
      message: 'Login successfully!',
    };
  }

  @HasRoles(RoleEnumType.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  onlyAdmin(@Req() req: ReqTypes) {
    return this.userService.findOne({
      where: { id: req.user.id },
      relations: ['profile'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('role')
  async updateRole(@Req() req: ReqTypes, @Body() body: RoleUpdateDto) {
    await this.authService.updateRole(req.user, body.role);
    return {
      status: 'success',
      message: 'Update role successfully!',
    };
  }

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto): Promise<User> {
    return await this.authService.register(registerAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: ReqTypes, @Res({ passthrough: true }) response: Response) {
    this.authService.logout(req.user, response);
    return {
      status: 'success',
      message: 'Logout successfully!',
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  refreshToken(
    @Req() req: ReqTypes,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.refreshToken(req.user, response);
    return {
      status: 'success',
      message: 'Refresh token successfully!',
    };
  }
}
