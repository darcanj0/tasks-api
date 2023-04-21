import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/user/domain/user';

export class CreateTagDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  @ApiProperty({
    example: 'Urgent',
    type: String,
    minLength: 3,
    maxLength: 15,
  })
  title: string;

  @IsHexColor()
  @ApiProperty({
    example: '#1c38e3',
    type: String,
  })
  hex: string;
}

export class CreateTagUsecaseDto extends CreateTagDto {
  user: User;
}
