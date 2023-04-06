import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserInput } from "../../graphql";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation("login")
  async login(@Args("userInput") userInput: UserInput, @Context() context): Promise<any> {
    return this.authService.login(userInput);
  }
}
