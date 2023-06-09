import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserUsecase } from './usecases/create-user/create-user.usecase';
import { CheckResult } from 'src/utils/error-messages';
import { CreateUserDto } from './usecases/create-user/create-user.dto';
import { UpdateUserDto } from './usecases/update-user/update-user.dto';
import { UpdateUserUsecase } from './usecases/update-user/update-user.usecase';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    @Inject(CreateUserUsecase)
    private readonly createUserUsecase: CreateUserUsecase,

    @Inject(UpdateUserUsecase)
    private readonly updateUserUsecase: UpdateUserUsecase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new user',
  })
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const result = await this.createUserUsecase.execute(dto);
    return CheckResult(result);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Updates an existing user',
  })
  async updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<void> {
    const result = await this.updateUserUsecase.execute({ ...dto, id });
    return CheckResult(result);
  }
}
