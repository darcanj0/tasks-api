import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Name must be a string',
  })
  name: string;

  @IsString({
    message: 'Password must be a string',
  })
  @Matches('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$')
  password: string;

  @IsEmail()
  email: string;
}
