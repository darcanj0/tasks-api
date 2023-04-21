import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { User } from 'src/user/domain/user';

export class DeleteTasksDto {
  @IsUUID(4, {
    each: true,
  })
  @ApiProperty({
    type: Array<string>,
    example: [''],
  })
  tasksIds: string[];
}

export class DeleteTasksUsecaseDto extends DeleteTasksDto {
  user: User;
}
