import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { CreateTaskUsecase } from './usecases/create-task/create-task.usecase';
import { UpdateTaskUsecase } from './usecases/update-task/update-task.usecase';
import { TaskRepository } from './infra/task-repository';
import { MongoModule } from 'src/mongo/mongo.module';
import { TagModule } from 'src/tag/tag.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongoModule, TagModule, UserModule],
  controllers: [TaskController],
  providers: [CreateTaskUsecase, UpdateTaskUsecase, TaskRepository],
  exports: [TaskRepository],
})
export class TaskModule {}
