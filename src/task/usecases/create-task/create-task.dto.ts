import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/user/domain/user';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({
    type: String,
    minLength: 5,
    maxLength: 50,
    example: 'Do something',
  })
  title: string;

  user: User;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsUUID(4, {
    each: true,
  })
  tags?: string[];
}
