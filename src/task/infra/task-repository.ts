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

  async findTasksByIds(ids: string[]): Promise<Task[]> {
    const query = await this.taskModel
      .find({
        id: { $in: ids },
      })
      .exec();

    if (!query || query.length === 0) return [];

    return query.map((task) => this.toDomain(task));
  }

  async deleteMany(tasks: Task[]): Promise<void> {
    const ids = tasks.map((task) => task.id);

    await this.taskModel
      .deleteMany({
        id: { $in: ids },
      })
      .exec();
  }

  async findTasksByCreator(creatorId: string): Promise<Task[]> {
    const query = await this.taskModel
      .find({
        creatorId: creatorId,
      })
      .exec();

    if (!query || query.length === 0) return [];

    return query.map((task) => this.toDomain(task));
  }

  toDomain(target: TaskModel): Task {
    return Task.create({
      title: target.title,
      creatorId: target.creatorId,
      id: target.id,
      dueDate: target.dueDate,
      tagsIds: target.tags,
    }).getResult;
  }

  toModel(target: Task): TaskModel {
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
