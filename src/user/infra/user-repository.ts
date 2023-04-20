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
  async findUserById(id: string): Promise<User> {
    const query = await this.userModel.findOne({
      id,
    });
    if (!query) return null;
    return User.create({
      email: query.email,
      name: query.name,
      password: query.password,
      id: query.id,
    }).getResult;
  }

  async findUserByEmail(email: string): Promise<User> {
    const query = await this.userModel.findOne({
      email,
    });
    if (!query) return null;
    return User.create({
      email: query.email,
      name: query.name,
      password: query.password,
      id: query.id,
    }).getResult;
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const query = await this.userModel
      .findOne({
        email,
      })
      .exec();
    return !!query;
  }

  async save(user: User): Promise<void> {
    const query = await this.userModel.findOne({
      email: user.email,
    });

    const obj = {
      email: user.email,
      name: user.name,
      password: user.password,
      id: user.id,
    };

    if (!query) {
      await this.userModel.insertMany([obj]);
      return;
    }

    await this.userModel.updateOne(
      { id: user.id },
      {
        $set: obj,
      },
    );
  }
}
