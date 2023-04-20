import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString({
    message: 'Name must be a string',
  })
  @ApiProperty({
    type: String,
    minLength: 4,
    maxLength: 20,
    description: 'User name',
    required: false,
  })
  name?: string;

  @IsString({
    message: 'Password must be a string',
  })
  @Matches('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$')
  @ApiProperty({
    type: String,
    minLength: 8,
    description: 'Password. One number, one letter.',
    required: false,
  })
  password?: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email',
    required: false,
  })
  email?: string;
}
