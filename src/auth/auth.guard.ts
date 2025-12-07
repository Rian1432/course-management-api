import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) throw new UnauthorizedException('Unauthorized');

    try {
      const payload = await this.jwtService.verifyAsync<{ [key: string]: any }>(
        authorization,
        {
          secret: process.env.SECRET_KEY,
        },
      );
      request['sub'] = payload;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return type === 'Bearer' ? token : undefined;
  }
}
