import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskUsecase } from './usecases/create-task/create-task.usecase';
import { UpdateTaskUsecase } from './usecases/update-task/update-task.usecase';
import { CreateTaskDto } from './usecases/create-task/create-task.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/domain/user';
import { CheckResult } from 'src/utils/error-messages';
import { UpdateTaskDto } from './usecases/update-task/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(
    @Inject(CreateTaskUsecase)
    private readonly createTaskUsecase: CreateTaskUsecase,

    @Inject(UpdateTaskUsecase)
    private readonly updateTaskUsecase: UpdateTaskUsecase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create a task',
  })
  async createTask(
    @Body() dto: Omit<CreateTaskDto, 'user'>,
    @CurrentUser() user: User,
  ): Promise<void> {
    const result = await this.createTaskUsecase.execute({
      ...dto,
      user,
    });
    return CheckResult(result);
  }

  @Post(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a task',
  })
  @UseGuards(AuthGuard)
  async update(
    @Body() dto: Omit<UpdateTaskDto, 'user' | 'id'>,
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    const result = await this.updateTaskUsecase.execute({
      ...dto,
      user,
      id,
    });
    return CheckResult(result);
  }
}
