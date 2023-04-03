import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserInput } from "../user.input";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation("login")
  async login(@Args("userInput") userInput: UserInput): Promise<string> {
    const { username, password } = userInput;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const token = this.authService.login(user);

    return token;
  }
}
