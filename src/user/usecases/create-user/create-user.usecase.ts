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
import { v4 as uuidv4 } from 'uuid';

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
      const invalidEmail = await this.userRepo.emailAlreadyExists(dto.email);
      if (invalidEmail) return Result.fail(INVALID_USER_EMAIL);
      const hashedPassword = await bcrypt.hash(dto.password, 12);

      const createUser = User.create({
        email: dto.email,
        id: uuidv4(),
        name: dto.name,
        password: hashedPassword,
      });
      if (createUser.isFailure) return Result.fail(createUser.error);

      await this.userRepo.save(createUser.getResult);

      return Result.ok();
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }
}
