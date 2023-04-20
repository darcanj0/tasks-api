import {
  Body,
  Controller,
  Inject,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './login.dto';
import { AuthService } from './auth.service';
import { CheckResult } from 'src/utils/error-messages';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
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
}
