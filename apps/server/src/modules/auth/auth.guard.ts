import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = /^Bearer (.+)$/.exec(request.headers.authorization ?? '')?.[1];
    if (!token) throw new UnauthorizedException();
    try { request.user = await this.jwt.verifyAsync<{ sub: string; username: string }>(token); return true; }
    catch { throw new UnauthorizedException(); }
  }
}
