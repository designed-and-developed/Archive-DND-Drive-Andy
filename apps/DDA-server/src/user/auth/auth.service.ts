import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user.service";
import { UserEntity } from "../user.entity";
import * as bcrypt from "bcryptjs";
import { UserInput } from "../../graphql";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity | null> {
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

  async login(userInput: UserInput) {
    try {
      const { username, password } = userInput;
      const user = await this.validateUser(username, password);

      if (!user) {
        return null;
      }

      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        username,
      };
    } catch (error) {}
  }
}
