import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Omit<User, 'password'>[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateUserDto,
  ): Promise<Omit<User, 'password'> | null> {
    return this.userService.updateUser(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
