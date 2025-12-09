import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../role/role.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,

    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(pagination: PaginationDto) {
    const { limit, offset, search } = pagination;
    const whereCondition: FindOptionsWhere<User> = {};

    if (search) {
      whereCondition.name = Like(`%${search}%`);
    }

    const [items, total] = await this.repository.findAndCount({
      where: whereCondition,
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    return {
      items,
      total,
      limit,
      offset,
    };
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne({
      where: { id: user.roleId },
    });

    if (!role) {
      throw new NotFoundException('Role não encontrada');
    }

    const hashPassword = await bcrypt.hash(user.password, 10);

    return this.repository.save({
      ...user,
      password: hashPassword,
      role: role,
    });
  }

  async updateUser(
    id: number,
    data: UpdateUserDto,
  ): Promise<Omit<User, 'password'> | null> {
    const currentUser = await this.repository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!currentUser) {
      throw new NotFoundException('Este usuário não existe');
    }

    if (data.roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: data.roleId },
      });
      if (!role) throw new NotFoundException('Role não encontrada');

      currentUser.role = role;
    }

    if (data.name) currentUser.name = data.name;
    if (data.email) currentUser.email = data.email;

    if (data.password) {
      currentUser.password = await bcrypt.hash(data.password, 10);
    }

    await this.repository.save(currentUser);

    return this.repository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        role: true,
      },
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
