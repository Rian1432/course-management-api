import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly AuthService: AuthService;

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: any) {
    return this.AuthService.signIn(body);
  }
}
