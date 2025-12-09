import { forwardRef, Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { roleProvider } from './role.provider';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [RoleController],
  providers: [RoleService, ...roleProvider],
  exports: [RoleService, 'ROLE_REPOSITORY'],
})
export class RoleModule {}
