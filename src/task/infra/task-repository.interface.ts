import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Task } from '../domain/task';
import { HydratedDocument } from 'mongoose';

export interface ITaskRepo {
  save(task: Task): Promise<void>;
  findTaskById(id: string): Promise<Task>;
}

@Schema()
export class TaskModel {
  @Prop({ required: true, unique: true, type: String })
  id!: string;

  @Prop({ required: true, type: String })
  creatorId!: string;

  @Prop({ required: true, type: String })
  title!: string;

  @Prop({ required: false, type: Date })
  dueDate?: Date;

  @Prop({ required: false, type: [String] })
  tags?: string[];
}

export type TaskDocument = HydratedDocument<TaskModel>;

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
