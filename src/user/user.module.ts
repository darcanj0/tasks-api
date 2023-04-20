import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUsecase } from './usecases/create-user/create-user.usecase';
import { UserRepository } from './infra/user-repository';
import { MongoModule } from 'src/mongo/mongo.module';
import { UpdateUserUsecase } from './usecases/update-user/update-user.usecase';

@Module({
  imports: [MongoModule],
  providers: [CreateUserUsecase, UpdateUserUsecase, UserRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
