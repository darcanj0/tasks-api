import {
  Controller,
  Post,
  Body,
  UseGuards,
  Inject,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './usecases/create-tag/create-tag.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTagUseCase } from './usecases/create-tag/create-tag.usecase';
import { CheckResult } from 'src/utils/error-messages';
import { UpdateTagUsecase } from './usecases/update-tag/update-tag.usecase';
import { UpdateTagDto } from './usecases/update-tag/update-tag.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/domain/user';
import { TagRepository } from './infra/tag-repository';
import { TagModel } from './infra/tag-repository.interface';
import { DeleteTagsDto } from './usecases/delete-tags/delete-tags.dto';
import { DeleteTagsUsecase } from './usecases/delete-tags/delete-tags.usecase';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(
    @Inject(CreateTagUseCase)
    private readonly createTagUsecase: CreateTagUseCase,

    @Inject(UpdateTagUsecase)
    private readonly updateTagUsecase: UpdateTagUsecase,

    @Inject(DeleteTagsUsecase)
    private readonly deleteTagsUsecase: DeleteTagsUsecase,

    @Inject(TagRepository)
    private readonly tagRepo: TagRepository,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create tag',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createTag(
    @Body() dto: CreateTagDto,
    @CurrentUser() user: User,
  ): Promise<void> {
    const result = await this.createTagUsecase.execute({
      ...dto,
      user,
    });
    return CheckResult(result);
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Update tag by id',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateTag(
    @Param('id') id: string,
    @Body() dto: UpdateTagDto,
    @CurrentUser() user: User,
  ): Promise<void> {
    const result = await this.updateTagUsecase.execute({
      ...dto,
      id,
      user,
    });
    return CheckResult(result);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get my tags',
  })
  async getUserTags(@CurrentUser() user: User): Promise<TagModel[]> {
    const tags = await this.tagRepo.findTagsByCreator(user.id);
    return tags.map((tag) => this.tagRepo.toModel(tag));
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete tags',
  })
  async DeleteTasksDto(
    @Body() dto: DeleteTagsDto,
    @CurrentUser() user: User,
  ): Promise<void> {
    const result = await this.deleteTagsUsecase.execute({
      ...dto,
      user,
    });
    return CheckResult(result);
  }
}
