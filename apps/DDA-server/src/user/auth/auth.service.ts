import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";
import { UserEntity } from "../user.entity";
import * as bcrypt from "bcryptjs";
import { UserInput } from "../../graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
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

  // async validateUserId(token: string): Promise<string> {
  //   // decode the token to a userId

  //   // check whether the userId exists in the backend

  //   // if exists
  //   return
  // }

  async login(userInput: UserInput) {
    try {
      const user = await this.validateUser(userInput.username, userInput.password);

      if (!user) return null;

      return {
        access_token: this.jwtService.sign({
          username: user.username,
          sub: user.id,
        }),
        username: user.username,
      };
    } catch (err) {}
  }
}
