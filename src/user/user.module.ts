import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [UserController],
})
export class UserModule {}
