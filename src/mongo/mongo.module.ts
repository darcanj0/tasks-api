import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModel, TagSchema } from 'src/tag/infra/tag-repository.interface';
import {
  TaskModel,
  TaskSchema,
} from 'src/task/infra/task-repository.interface';
import {
  UserModel,
  UserSchema,
} from 'src/user/infra/user-repository.interface';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'tasks-db',
    }),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TagModel.name, schema: TagSchema }]),
    MongooseModule.forFeature([{ name: TaskModel.name, schema: TaskSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
