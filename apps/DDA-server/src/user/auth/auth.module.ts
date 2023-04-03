import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user.entity";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UserService } from "../user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: "my-secret-key",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    UserService
  ],
  exports: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
