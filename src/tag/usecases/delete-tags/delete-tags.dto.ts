import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { User } from 'src/user/domain/user';

export class DeleteTagsDto {
  @IsUUID(4, {
    each: true,
  })
  @ApiProperty({
    type: Array<string>,
    example: [''],
  })
  tagsIds: string[];
}

export class DeleteTagsUsecaseDto extends DeleteTagsDto {
  user: User;
}
