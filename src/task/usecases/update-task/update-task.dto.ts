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

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({
    type: String,
    minLength: 5,
    maxLength: 50,
    example: 'Do something',
  })
  title?: string;

  user: User;

  id: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  dueDate?: Date;

  @IsOptional()
  @IsUUID(4, {
    each: true,
  })
  @ApiProperty({
    isArray: true,
    type: Array<string>,
    example: ['tagId'],
  })
  tags?: string[];
}

export class UpdateTaskUsecaseDto extends UpdateTaskDto {
  user: User;
  id: string;
}
