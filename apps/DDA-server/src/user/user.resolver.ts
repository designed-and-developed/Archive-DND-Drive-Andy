import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserInput } from "./user.input";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation("createUser")
  async createUser(@Args("userInput") userInput: UserInput) {
    return await this.userService.createUser(userInput);
  }

  // @Query("user")
  // findOne(@Args("id") id: number) {
  //   return this.userService.showById(id);
  // }
}
