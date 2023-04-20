import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/utils/usecase.interface';
import { UpdateUserDto } from './update-user.dto';
import { IUserRepo } from '../../infra/user-repository.interface';
import { UserRepository } from '../../infra/user-repository';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/user';
import { Result } from 'src/utils/result';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_USER_EMAIL,
  INVALID_USER_NAME,
  INVALID_USER_NOT_FOUND,
} from 'src/utils/error-messages';

@Injectable()
export class UpdateUserUseCase
  implements IUseCase<UpdateUserDto, Result<void>>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: IUserRepo,
  ) {}

  async execute(dto: UpdateUserDto): Promise<Result<void>> {
    try {
      const { email, name, password } = dto;

      const user = await this.userRepo.findUserByEmail(email);
      if (!user) return Result.fail(INVALID_USER_NOT_FOUND);

      if (email) {
        const changeEmail = await this.changeEmail(user, email);
        if (changeEmail.isFailure) return Result.fail(changeEmail.error);
      }

      if (name) {
        const changeName = await this.changeName(user, name);
        if (changeName.isFailure) return Result.fail(changeName.error);
      }

      if (password) {
        await this.changePassword(user, password);
      }

      await this.userRepo.save(user);

      return Result.ok();
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }

  private async changeEmail(user: User, email: string): Promise<Result<void>> {
    const invalidEmail = await this.userRepo.emailAlreadyExists(email);
    if (invalidEmail) return Result.fail(INVALID_USER_EMAIL);
    user.email = email;
  }

  private async changePassword(user: User, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
  }

  private async changeName(user: User, name: string): Promise<Result<void>> {
    const changeName = User.isValidName(name);
    if (!changeName) return Result.fail(INVALID_USER_NAME);
  }
}
