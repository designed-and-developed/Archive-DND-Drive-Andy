import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './user.input';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  // @Query('user')
  // findOne(@Args('id') id: number) {
  //   return this.userService.showById(id);
  // }

}