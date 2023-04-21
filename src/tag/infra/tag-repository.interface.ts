import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '../domain/tag';
import { HydratedDocument } from 'mongoose';

export interface ITagRepo {
  findTagById(id: string): Promise<Tag>;
  findTagsByIds(ids: string[]): Promise<Tag[]>;
  save(tag: Tag): Promise<void>;
  findTagsByCreator(creatorId: string): Promise<Tag[]>;
}

@Schema()
export class TagModel {
  @Prop({ required: true, unique: true })
  id!: string;

  @Prop({ required: true })
  creatorId!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  hex!: string;
}

export type TagDocument = HydratedDocument<TagModel>;

export const TagSchema = SchemaFactory.createForClass(TagModel);
