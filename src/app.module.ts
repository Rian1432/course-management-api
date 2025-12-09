import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ResponseInterceptor } from './common/global-response-interceptor/response.interceptor';
import { RoleService } from './role/role.service';
import { CourseService } from './course/course.service';
import { UserCourseService } from './user-course/user-course.service';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, RoleModule],
  controllers: [AppController, UserController, RoleController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    UserService,
    AuthService,
    RoleService,
    CourseService,
    UserCourseService,
  ],
})
export class AppModule {}
