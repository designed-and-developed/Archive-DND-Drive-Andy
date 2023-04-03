import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserInput } from "./user.input";
import { UserEntity } from "./user.entity";
import { SuccessResponse } from "../graphql";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userInput: UserInput): Promise<SuccessResponse> {
    if (!userInput || !userInput.username || !userInput.password) {
      throw new Error("Invalid userInput");
    }

    const user = new UserEntity();
    user.username = userInput.username;
    user.password = userInput.password;

    await this.userRepository.save(user);

    const response:SuccessResponse = { success: true };

    return response;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
