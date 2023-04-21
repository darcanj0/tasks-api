import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/utils/usecase.interface';
import { CreateTaskDto } from './create-task.dto';
import { Result } from 'src/utils/result';
import { ITaskRepo } from 'src/task/infra/task-repository.interface';
import { Task } from 'src/task/domain/task';
import { v4 as uuidv4 } from 'uuid';
import { INTERNAL_SERVER_ERROR } from 'src/utils/error-messages';
import { TagRepository } from 'src/tag/infra/tag-repository';
import { ITagRepo } from 'src/tag/infra/tag-repository.interface';
import { TaskRepository } from 'src/task/infra/task-repository';

@Injectable()
export class CreateTaskUsecase
  implements IUseCase<CreateTaskDto, Result<void>>
{
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepo: ITaskRepo,

    @Inject(TagRepository)
    private readonly tagRepo: ITagRepo,
  ) {}
  async execute(dto: CreateTaskDto): Promise<Result<void>> {
    try {
      const { title, user, dueDate, tags } = dto;

      const createTask = Task.create({
        creatorId: user.id,
        title,
        dueDate,
        tagsIds: [],
        id: uuidv4(),
      });

      if (createTask.isFailure) return Result.fail(createTask.error);

      const task = createTask.getResult;

      if (tags.length > 0) {
        const findTags = await this.tagRepo.findTagsByIds(tags);
        findTags.forEach((tag) => task.addTag(tag.id));
      }

      await this.taskRepo.save(task);
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }
}
