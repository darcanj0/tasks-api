import { Inject, Injectable } from '@nestjs/common';
import { LoginDto, LoginResponse } from './login.dto';
import { UserRepository } from 'src/user/infra/user-repository';
import { IUserRepo } from 'src/user/infra/user-repository.interface';
import { Result } from 'src/utils/result';
import { INVALID_AUTH, INVALID_USER_NOT_FOUND } from 'src/utils/error-messages';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { variables } from 'src/config/variables';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: IUserRepo,

    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<Result<LoginResponse>> {
    const user = await this.userRepo.findUserByEmail(dto.email);
    if (!user) return Result.fail(INVALID_USER_NOT_FOUND);

    const correctPassword = await bcrypt.compare(dto.password, user.password);
    if (!correctPassword) return Result.fail(INVALID_AUTH);

    const token = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      {
        secret: variables().jwtSecret,
      },
    );

    return Result.success({
      email: user.email,
      id: user.id,
      name: user.name,
      token,
    });
  }
}
