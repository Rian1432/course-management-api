import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.repository.save(user);
  }

  async updateUser(user: UpdateUserDto): Promise<User> {
    return this.repository.save(user);
  }

  async deleteUser(userId: string): Promise<any> {
    const deleteResult = await this.repository.delete(userId);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(404);
    }

    return deleteResult;
  }
}
