import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { userProvider } from './user/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, ...userProvider],
})
export class AppModule {}
