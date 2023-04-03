import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginResponse, UserInput } from "../../graphql";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation("login")
  async login(@Args("userInput") userInput: UserInput): Promise<LoginResponse> {
    return this.authService.login(userInput);
  }
}
