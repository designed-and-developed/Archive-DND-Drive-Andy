import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async login(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.login(email, password);
  }
}
