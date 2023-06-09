import { User } from 'src/entities/user.entity';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { Response } from 'express';

export interface AuthServiceInterface {
  login(loginAuthDto: LoginAuthDto, response: Response);

  register(registerDto: RegisterAuthDto): Promise<User>;

  // logout(): any;
  // refreshToken(): any;
}
