import { Module } from '@nestjs/common';
import { CreateTagUseCase } from './usecases/create-tag/create-tag.usecase';
import { TagRepository } from './infra/tag-repository';
import { TagController } from './tag.controller';

@Module({
  controllers: [TagController],
  providers: [CreateTagUseCase, TagRepository],
})
export class TagModule {}
