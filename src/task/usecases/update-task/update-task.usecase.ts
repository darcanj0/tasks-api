import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepo } from 'src/task/infra/task-repository.interface';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_TASK_CREATOR,
  INVALID_TASK_NOT_FOUND,
} from 'src/utils/error-messages';
import { Result } from 'src/utils/result';
import { IUseCase } from 'src/utils/usecase.interface';
import { UpdateTaskDto } from './update-task.dto';
import { TagRepository } from 'src/tag/infra/tag-repository';
import { ITagRepo } from 'src/tag/infra/tag-repository.interface';

@Injectable()
export class UpdateTaskUsecase
  implements IUseCase<UpdateTaskDto, Result<void>>
{
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepo: ITaskRepo,

    @Inject(TagRepository)
    private readonly tagRepo: ITagRepo,
  ) {}

  async execute(dto: UpdateTaskDto): Promise<Result<void>> {
    try {
      const { user, dueDate, tags, title, id } = dto;

      const task = await this.taskRepo.findTaskById(id);
      if (!task) return Result.fail(INVALID_TASK_NOT_FOUND);

      if (task.creator !== user.id) return Result.fail(INVALID_TASK_CREATOR);

      if (dueDate) task.dueDate = dueDate;
      if (title) {
        const changeTitle = task.changeTitle(title);
        if (changeTitle.isFailure) return changeTitle;
      }

      if (tags.length > 0) {
        const findTags = await this.tagRepo.findTagsByIds(tags);
        findTags.forEach((tag) => task.addTag(tag.id));
      }

      await this.taskRepo.save(task);
      return Result.ok();
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }
}
