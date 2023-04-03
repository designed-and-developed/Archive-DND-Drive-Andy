import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user.service";
import { UserEntity } from "../user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
