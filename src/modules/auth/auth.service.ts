import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { RoleEnumType, User } from 'src/entities/user.entity';
import { LoginAuthDto } from 'src/modules/auth/dto/login-auth.dto';
import { RegisterAuthDto } from 'src/modules/auth/dto/register-auth.dto';
import { TokenService } from 'src/modules/token/token.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async getAuthenticatedUser(loginAuthDto: LoginAuthDto): Promise<User> {
    try {
      const user = await this.userService.findOne({
        where: {
          email: loginAuthDto.email,
        },
        relations: {
          profile: true,
        },
      });
      await this.verifyPassword(loginAuthDto.password, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: User, response: Response) {
    const payload = { email: user.email, sub: user.id };
    const { accessToken, refreshToken } =
      this.tokenService.generateTokens(payload);
    await this.tokenService.setCurrentRefreshToken(user.id, refreshToken);
    this.tokenService.setTokensToCookie(accessToken, refreshToken, response);
  }

  register(registerDto: RegisterAuthDto): Promise<User> {
    return this.userService.create(registerDto);
  }

  logout(user: User, res: Response) {
    res.cookie('accessToken', '', { maxAge: -1 });
    res.cookie('refreshToken', '', { maxAge: -1 });
    res.cookie('loggedIn', '', { maxAge: -1 });
    return this.tokenService.removeRefreshToken(user.id);
  }

  refreshToken(user: User, res: Response) {
    const payload = { email: user.email, sub: user.id };
    const { accessToken } = this.tokenService.generateTokens(payload);
    this.tokenService.setAccessTokenToCookie(accessToken, res);
  }

  updateRole(user: User, role: RoleEnumType) {
    return this.userService.update(user.id, {
      role,
    });
  }
}
