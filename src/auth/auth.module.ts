import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config()
@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRATION },
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
