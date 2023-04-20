import { Module } from '@nestjs/common';
import { CreateTagUseCase } from './usecases/create-tag/create-tag.usecase';
import { TagRepository } from './infra/tag-repository';
import { TagController } from './tag.controller';
import { UpdateTagUsecase } from './usecases/update-tag/update-tag.usecase';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [TagController],
  providers: [CreateTagUseCase, UpdateTagUsecase, TagRepository],
  exports: [TagRepository],
})
export class TagModule {}
