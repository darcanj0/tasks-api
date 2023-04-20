import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
