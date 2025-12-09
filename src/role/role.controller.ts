import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body() data: { name: string }): Promise<Role> {
    return this.roleService.createRole(data);
  }
}
