import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('CreateUserInput') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Query('user')
  // findOne(@Args('id') id: number) {
  //   return this.userService.showById(id);
  // }

}