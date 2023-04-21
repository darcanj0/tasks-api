import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { variables } from 'src/config/variables';
import { UserRepository } from 'src/user/infra/user-repository';
import { IUserRepo } from 'src/user/infra/user-repository.interface';
import { Request } from 'express';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_AUTH,
  INVALID_TOKEN_NOT_SENT,
} from 'src/utils/error-messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(UserRepository) private readonly userRepo: IUserRepo,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException(INVALID_TOKEN_NOT_SENT);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: variables().jwtSecret,
      });

      const user = await this.userRepo.findUserById(payload.id);
      if (!user) throw new UnauthorizedException(INVALID_AUTH);

      request['user'] = user;
    } catch (error) {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
