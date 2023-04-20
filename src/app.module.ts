import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { variables } from './config/variables';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    MongoModule,
    UserModule,
    AuthModule,
    TagModule,
    ConfigModule.forRoot({ isGlobal: true, load: [variables] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
