import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { userProvider } from './user.provider';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...userProvider, UserService],
  exports: ['USER_REPOSITORY', UserService],
})
export class UserModule {}
