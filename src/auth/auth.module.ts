import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { variables } from 'src/config/variables';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '5d' },
      secretOrPrivateKey: variables().jwtSecret,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
