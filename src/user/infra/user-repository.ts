import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/user';
import { IUserRepo, UserModel } from './user-repository.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepo {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async emailAlreadyExists(email: string): Promise<any> {
    const query = await this.userModel
      .findOne({
        email,
      })
      .exec();
    return query;
  }

  async save(user: User): Promise<void> {
    const query = await this.userModel.find({
      email: user.email,
    });

    if (!query) {
      await this.userModel.create({
        email: user.email,
        name: user.name,
        password: user.password,
      });
      return;
    }

    await this.userModel.updateOne(
      { email: user.email },
      {
        $set: { email: user.email, name: user.name, password: user.password },
      },
    );
  }
}
