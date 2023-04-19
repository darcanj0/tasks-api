import { User } from '../domain/user';
import { IUserRepo } from './user-repository.interface';

export class UserRepository implements IUserRepo {
  emailAlreadyExists(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
