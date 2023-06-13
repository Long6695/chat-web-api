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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
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
  onlyAdmin(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('role')
  async updateRole(@Req() req, @Body() body: RoleUpdateDto) {
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
  logout(@Req() req, @Res({ passthrough: true }) response: Response) {
    this.authService.logout(req.user, response);
    return {
      status: 'success',
      message: 'Logout successfully!',
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  refreshToken(@Req() req, @Res({ passthrough: true }) response: Response) {
    this.authService.refreshToken(req.user, response);
    return {
      status: 'success',
      message: 'Refresh token successfully!',
    };
  }
}
