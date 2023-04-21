import {
  Body,
  Controller,
  Get,
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
import { TaskRepository } from './infra/task-repository';
import { TaskModel } from './infra/task-repository.interface';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(
    @Inject(CreateTaskUsecase)
    private readonly createTaskUsecase: CreateTaskUsecase,

    @Inject(UpdateTaskUsecase)
    private readonly updateTaskUsecase: UpdateTaskUsecase,

    @Inject(TaskRepository)
    private readonly taskRepo: TaskRepository,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create a task',
  })
  async createTask(
    @Body() dto: CreateTaskDto,
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
    @Body() dto: UpdateTaskDto,
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

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get my tasks',
  })
  async getUserTasks(@CurrentUser() user: User): Promise<TaskModel[]> {
    const tasks = await this.taskRepo.findTasksByCreator(user.id);
    return tasks.map((task) => this.taskRepo.toModel(task));
  }
}
