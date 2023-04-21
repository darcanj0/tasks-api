import { Injectable } from '@nestjs/common';
import { ITagRepo, TagModel } from './tag-repository.interface';
import { Tag } from '../domain/tag';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskModel } from 'src/task/infra/task-repository.interface';

@Injectable()
export class TagRepository implements ITagRepo {
  constructor(
    @InjectModel(TagModel.name) private tagModel: Model<TagModel>,
    @InjectModel(TaskModel.name) private taskModel: Model<TaskModel>,
  ) {}

  async deleteMany(tags: Tag[]): Promise<void> {
    const ids = tags.map((tag) => tag.id);

    await this.tagModel
      .deleteMany({
        id: { $in: ids },
      })
      .exec();

    await Promise.all(
      ids.map(async (tagId) => {
        const tasks = await this.taskModel
          .find({
            tags: tagId,
          })
          .exec();
        if (!tasks || tasks.length === 0) return;
        tasks.forEach(async (task) => {
          task.tags = task.tags.filter((tag) => tag !== tagId);
          await this.taskModel.updateOne(
            { id: task.id },
            { $set: { ...task } },
          );
        });
      }),
    );
  }

  async findTagsByCreator(creatorId: string): Promise<Tag[]> {
    const query = await this.tagModel
      .find({
        creatorId: creatorId,
      })
      .exec();

    if (!query || query.length === 0) return [];

    return query.map((tag) => this.toDomain(tag));
  }

  public toDomain(target: TagModel): Tag {
    return Tag.create({
      creatorId: target.creatorId,
      hex: target.hex,
      id: target.id,
      title: target.title,
    }).getResult;
  }

  public toModel(target: Tag): TagModel {
    return {
      creatorId: target.creatorId,
      hex: target.hex,
      id: target.id,
      title: target.title,
    };
  }

  async findTagsByIds(ids: string[]): Promise<Tag[]> {
    const query = await this.tagModel
      .find({
        id: { $in: ids },
      })
      .exec();

    if (!query || query.length === 0) return [];

    return query.map((tag) => this.toDomain(tag));
  }

  async findTagById(id: string): Promise<Tag> {
    const query = await this.tagModel.findOne({
      id,
    });
    if (!query) return null;
    return this.toDomain(query);
  }

  async save(tag: Tag): Promise<void> {
    const query = await this.tagModel.findOne({
      id: tag.id,
    });

    const obj = this.toModel(tag);

    if (!query) {
      await this.tagModel.insertMany([obj]);
    }

    await this.tagModel.updateOne(
      { id: tag.id },
      {
        $set: obj,
      },
    );
  }
}
