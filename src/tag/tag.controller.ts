import {
  Controller,
  Post,
  Body,
  UseGuards,
  Inject,
  Param,
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

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(
    @Inject(CreateTagUseCase)
    private readonly createTagUsecase: CreateTagUseCase,

    @Inject(UpdateTagUsecase)
    private readonly updateTagUsecase: UpdateTagUsecase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create tag',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createTag(
    @Body() dto: Omit<CreateTagDto, 'user'>,
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
    @Body() dto: Omit<UpdateTagDto, 'user' | 'id'>,
    @CurrentUser() user: User,
  ): Promise<void> {
    const result = await this.updateTagUsecase.execute({
      ...dto,
      id,
      user,
    });
    return CheckResult(result);
  }
}
