import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './usecases/create-user.usecase.dto';
import { CreateUserUsecase } from './usecases/create-user/create-user.usecase';
import { CheckResult } from 'src/utils/error-messages';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    @Inject(CreateUserUsecase)
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new user',
  })
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const result = await this.createUserUsecase.execute(dto);
    return CheckResult(result);
  }
}
