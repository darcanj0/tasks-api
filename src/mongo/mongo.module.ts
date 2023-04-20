import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { variables } from 'src/config/variables';
import { TagModel, TagSchema } from 'src/tag/infra/tag-repository.interface';
import {
  UserModel,
  UserSchema,
} from 'src/user/infra/user-repository.interface';

@Module({
  imports: [
    MongooseModule.forRoot(variables().mongoConnection),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TagModel.name, schema: TagSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
