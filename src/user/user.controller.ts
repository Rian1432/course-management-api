import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() pagination: PaginationDto) {
    return this.userService.findAll(pagination);
  }

  @Post()
  create(@Body(new ValidationPipe()) data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateUserDto,
  ): Promise<Omit<User, 'password'> | null> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<object | NotFoundException> {
    return this.userService.deleteUser(id);
  }
}
