import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUsecase } from './usecases/create-user/create-user.usecase';
import { UserRepository } from './infra/user-repository';
import { UserModel, UserSchema } from './infra/user-repository.interface';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [CreateUserUsecase, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
