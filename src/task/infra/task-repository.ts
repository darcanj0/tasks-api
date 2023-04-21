import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task';
import { ITaskRepo, TaskModel } from './task-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskRepository implements ITaskRepo {
  constructor(
    @InjectModel(TaskModel.name) private taskModel: Model<TaskModel>,
  ) {}

  private toDomain(target: TaskModel): Task {
    return Task.create({
      title: target.title,
      creatorId: target.creatorId,
      id: target.id,
      dueDate: target.dueDate,
      tagsIds: target.tags,
    }).getResult;
  }

  private toModel(target: Task): TaskModel {
    return {
      creatorId: target.creator,
      dueDate: target.dueDate ?? undefined,
      id: target.id,
      title: target.title,
      tags: target.tags,
    };
  }

  async save(task: Task): Promise<void> {
    const query = await this.taskModel.findOne({
      id: task.id,
    });

    const obj = this.toModel(task);

    if (!query) {
      await this.taskModel.insertMany([obj]);
    }

    await this.taskModel.updateOne(
      { id: task.id },
      {
        $set: obj,
      },
    );
  }

  async findTaskById(id: string): Promise<Task> {
    const query = await this.taskModel.findOne({
      id,
    });
    if (!query) return null;
    return this.toDomain(query);
  }
}
