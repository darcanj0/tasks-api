import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { variables } from 'src/config/variables';
import {
  UserModel,
  UserSchema,
} from 'src/user/infra/user-repository.interface';

@Module({
  imports: [
    MongooseModule.forRoot(variables().mongoConnection),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
