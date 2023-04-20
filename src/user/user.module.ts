import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUsecase } from './usecases/create-user.usecase';
import { UserRepository } from './infra/user-repository';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [CreateUserUsecase, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
