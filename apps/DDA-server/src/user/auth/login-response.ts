import { InputType, Field } from "@nestjs/graphql";
import { User } from "src/graphql";

@InputType()
export class LoginResponse {
  @Field()
  user: User;

  @Field()
  access_token: string;
}