import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'my-secret-key', // set your secret key here
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserResolver, UserService, AuthResolver, AuthService, JwtStrategy],
  exports: [UserService, AuthService],
})
export class UserModule {}
