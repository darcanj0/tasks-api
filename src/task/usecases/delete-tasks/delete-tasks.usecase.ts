import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/utils/usecase.interface';
import { DeleteTasksUsecaseDto } from './delete-task.dto';
import { Result } from 'src/utils/result';
import { TaskRepository } from 'src/task/infra/task-repository';
import { ITaskRepo } from 'src/task/infra/task-repository.interface';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_TASK_DELETION,
} from 'src/utils/error-messages';

@Injectable()
export class DeleteTasksUsecase
  implements IUseCase<DeleteTasksUsecaseDto, Result<void>>
{
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepo: ITaskRepo,
  ) {}
  async execute(dto: DeleteTasksUsecaseDto): Promise<Result<void>> {
    try {
      const { tasksIds, user } = dto;

      const tasks = await this.taskRepo.findTasksByIds(tasksIds);

      const invalidDelete =
        tasks.some((task) => !task.isCreator(user.id)) ||
        tasksIds.length !== tasks.length;

      if (invalidDelete) return Result.fail(INVALID_TASK_DELETION);

      const owned = tasks.filter((task) => task.isCreator(user.id));

      await this.taskRepo.deleteMany(owned);

      return Result.ok();
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }
}
