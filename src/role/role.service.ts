import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private repository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.repository.find();
  }

  async createRole(role: { name: string }): Promise<Role> {
    return this.repository.save(role);
  }
}
