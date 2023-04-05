import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserInput } from "../graphql";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation("createUser")
  async createUser(@Args("userInput") userInput: UserInput) {
    return await this.userService.createUser(userInput);
  }

  @Query("findAllUser")
  async findAll() {
    return await this.userService.findAll();
  }
}
