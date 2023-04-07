import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user.entity";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserService } from "../user.service";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    UserModule,
    JwtModule.register({
      signOptions: {expiresIn: 7},
      secret: "secret",
    })
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtStrategy
  ],
  exports: [AuthResolver, AuthService, UserService],
})
export class AuthModule {}
