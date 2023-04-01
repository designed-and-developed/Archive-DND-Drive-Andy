import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './user.input';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    if (!createUserInput || !createUserInput.username || !createUserInput.password) {
      throw new Error('Invalid createUserInput');
    }

    const user = new UserEntity();
    user.username = createUserInput.username;
    user.password = createUserInput.password;
    
    return await this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: {username: username} });
  }
}
