import { User } from '../domain/user';

export interface IUserRepo {
  emailAlreadyExists(email: string): Promise<boolean>;
  save(user: User): Promise<void>;
}
