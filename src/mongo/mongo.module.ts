import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  exports: [
    MongooseModule.forRoot(
      'mongodb+srv://vinicius:Xz2S5LL89ry5Pr3m@cluster0.wr2wf0o.mongodb.net/test',
    ),
  ],
})
export class MongoModule {}
