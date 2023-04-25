import {
  Body,
  Controller,
  Inject,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './login.dto';
import { AuthService } from './auth.service';
import { CheckResult } from 'src/utils/error-messages';
import { AuthGuard } from './auth.guard';
import { UserModel } from 'src/user/infra/user-repository.interface';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/user/domain/user';
import { UserRepository } from 'src/user/infra/user-repository';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,

    @Inject(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sign in',
  })
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    const result = await this.authService.login(dto);
    return CheckResult(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retrieve current user data',
  })
  async getUser(@CurrentUser() user: User): Promise<UserModel> {
    return this.userRepo.toModel(user);
  }
}
