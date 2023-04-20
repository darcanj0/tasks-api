import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/utils/usecase.interface';
import { CreateUserDto } from './create-user.dto';
import { IUserRepo } from '../../infra/user-repository.interface';
import { UserRepository } from '../../infra/user-repository';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/user';
import { Result } from 'src/utils/result';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_USER_EMAIL,
} from 'src/utils/error-messages';

@Injectable()
export class CreateUserUsecase
  implements IUseCase<CreateUserDto, Result<void>>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: IUserRepo,
  ) {}

  async execute(dto: CreateUserDto): Promise<Result<void>> {
    try {
      const { email, password } = dto;

      const invalidEmail = await this.userRepo.emailAlreadyExists(email);
      if (invalidEmail) return Result.fail(INVALID_USER_EMAIL);
      const hashedPassword = await bcrypt.hash(password, 12);

      const createUser = User.create({ ...dto, password: hashedPassword });
      if (createUser.isFailure) return Result.fail(createUser.error);

      await this.userRepo.save(createUser.getResult);

      return Result.ok();
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }
}
