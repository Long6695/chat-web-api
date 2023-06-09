import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/libs/decorators/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Match('password')
  confirmPassword: string;
}
