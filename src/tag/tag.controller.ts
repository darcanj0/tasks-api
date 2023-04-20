import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './usecases/create-tag/create-tag.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTagUseCase } from './usecases/create-tag/create-tag.usecase';
import { CheckResult } from 'src/utils/error-messages';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(
    @Inject(CreateTagUseCase)
    private readonly createTagUsecase: CreateTagUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createTag(@Body() dto: CreateTagDto): Promise<void> {
    const result = await this.createTagUsecase.execute(dto);
    return CheckResult(result);
  }
}
