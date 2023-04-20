import { Injectable } from '@nestjs/common';
import { ITagRepo, TagModel } from './tag-repository.interface';
import { Tag } from '../domain/tag';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TagRepository implements ITagRepo {
  constructor(@InjectModel(TagModel.name) private tagModel: Model<TagModel>) {}
  async findTagById(id: string): Promise<Tag> {
    const query = await this.tagModel.findOne({
      id,
    });
    if (!query) return null;
    return Tag.create({
      creatorId: query.creatorId,
      hex: query.hex,
      title: query.title,
      id: query.id,
    }).getResult;
  }
  async save(tag: Tag): Promise<void> {
    const query = await this.tagModel.findOne({
      id: tag.id,
    });

    const obj = {
      creatorId: tag.creatorId,
      hex: tag.hex,
      id: tag.id,
      title: tag.title,
    };

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
