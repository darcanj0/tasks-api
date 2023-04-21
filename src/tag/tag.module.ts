import { Module } from '@nestjs/common';
import { CreateTagUseCase } from './usecases/create-tag/create-tag.usecase';
import { TagRepository } from './infra/tag-repository';
import { TagController } from './tag.controller';
import { UpdateTagUsecase } from './usecases/update-tag/update-tag.usecase';
import { MongoModule } from 'src/mongo/mongo.module';
import { UserModule } from 'src/user/user.module';
import { DeleteTagsUsecase } from './usecases/delete-tags/delete-tags.usecase';

@Module({
  imports: [MongoModule, UserModule],
  controllers: [TagController],
  providers: [
    CreateTagUseCase,
    UpdateTagUsecase,
    DeleteTagsUsecase,
    TagRepository,
  ],
  exports: [TagRepository],
})
export class TagModule {}
