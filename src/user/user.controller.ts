import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @Put(':id')
  update(@Body(new ValidationPipe()) data: CreateUserDto): Promise<User> {
    return this.userService.updateUser(data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
