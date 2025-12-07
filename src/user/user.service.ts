import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.repository.find({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);

    return this.repository.save({
      ...user,
      password: hashPassword,
    });
  }

  async updateUser(
    id: number,
    user: UpdateUserDto,
  ): Promise<Omit<User, 'password'> | null> {
    const updateResult = await this.repository.update(id, user);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return this.repository.findOne({
      where: { id },
      select: { id: true, name: true, email: true, created_at: true },
    });
  }

  async deleteUser(userId: string): Promise<object | NotFoundException> {
    const deleteResult = await this.repository.delete(userId);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(404);
    }

    return {};
  }
}
