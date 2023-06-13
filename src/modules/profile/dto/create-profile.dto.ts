import {
  IsDate,
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  firstName: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  lastName: string | null;

  @IsOptional()
  @IsDateString()
  dateOfBirth: Date | null;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  phone: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  country: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string | null;
}
