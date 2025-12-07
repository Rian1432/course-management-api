import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject('USER_REPOSITORY')
  private userRepository: Repository<User>;

  async signIn(params: User): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: params.email },
    });
    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
