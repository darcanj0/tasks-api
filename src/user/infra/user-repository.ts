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
  toModel(user: User): UserModel {
    return {
      email: user.email,
      id: user.id,
      name: user.name,
      password: user.password,
    };
  }

  toDomain(model: UserModel): User {
    return User.create({
      email: model.email,
      id: model.id,
      name: model.name,
      password: model.password,
    }).getResult;
  }

  async findUserById(id: string): Promise<User> {
    const query = await this.userModel.findOne({
      id,
    });
    if (!query) return null;
    return this.toDomain(query);
  }

  async findUserByEmail(email: string): Promise<User> {
    const query = await this.userModel.findOne({
      email,
    });
    if (!query) return null;
    return this.toDomain(query);
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

    const obj = this.toModel(user);

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
