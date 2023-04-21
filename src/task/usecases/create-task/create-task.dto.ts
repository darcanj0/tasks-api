import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
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

  @IsOptional()
  @IsDateString()
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
    type: Array<string>,
  })
  tags?: string[];
}

export class CreateTaskUsecaseDto extends CreateTaskDto {
  user: User;
}
