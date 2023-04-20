import { HydratedDocument } from 'mongoose';
import { User } from '../domain/user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IUserRepo {
  emailAlreadyExists(email: string): Promise<boolean>;
  save(user: User): Promise<void>;
}

@Schema()
export class UserModel {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

export type UserDocument = HydratedDocument<UserModel>;

export const UserSchema = SchemaFactory.createForClass(UserModel);
