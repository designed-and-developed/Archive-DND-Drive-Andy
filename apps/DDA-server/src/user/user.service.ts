import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { SuccessResponse, UserInput } from "../graphql";

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

    const existingUser = await this.userRepository.findOne({ where: { username: userInput.username } });
    if (existingUser) {
      throw new ConflictException('Username already in use');
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
