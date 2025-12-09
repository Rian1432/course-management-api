import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
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
