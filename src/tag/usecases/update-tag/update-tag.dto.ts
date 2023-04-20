import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexadecimal,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/user/domain/user';

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  @ApiProperty({
    example: 'Urgent',
    type: String,
    minLength: 3,
    maxLength: 15,
  })
  title?: string;

  @IsOptional()
  @IsHexadecimal()
  @ApiProperty({
    example: '#1c38e3',
    type: String,
  })
  hex?: string;

  id: string;

  user: User;
}
