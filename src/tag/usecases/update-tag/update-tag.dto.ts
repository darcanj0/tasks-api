import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexColor,
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
  @IsHexColor()
  @ApiProperty({
    example: '#1c38e3',
    type: String,
  })
  hex?: string;
}

export class UpdateTagUsecaseDto extends UpdateTagDto {
  id: string;

  user: User;
}
