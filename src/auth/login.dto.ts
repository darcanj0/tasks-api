import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'viniciusguerraf@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    type: String,
    minLength: 6,
    maxLength: 20,
    description: 'Password. One number, one letter, one special.',
    example: 'Password1!',
  })
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  name: string;
  id: string;
}
