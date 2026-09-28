import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { DatabaseService } from '../../infrastructure/database.module';

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService, private readonly jwt: JwtService) {}
  private validate(username: string, password: string) {
    if (!/^[a-zA-Z0-9_-]{3,32}$/.test(username ?? '') || typeof password !== 'string' || password.length < 12 || password.length > 128)
      throw new BadRequestException('Username must be 3-32 characters; password must be 12-128 characters');
  }
  async register(username: string, password: string) {
    this.validate(username, password);
    try {
      const result = await this.db.query<{ id: string }>('INSERT INTO users (username, password_hash) VALUES ($1,$2) RETURNING id', [username, await hash(password, 12)]);
      return { accessToken: await this.jwt.signAsync({ sub: result.rows[0].id, username }), tokenType: 'Bearer' as const };
    } catch (error: any) { if (error.code === '23505') throw new ConflictException('Username already exists'); throw error; }
  }
  async login(username: string, password: string) {
    const result = await this.db.query<{ id: string; password_hash: string }>('SELECT id, password_hash FROM users WHERE username=$1', [username]);
    if (!result.rows[0] || !(await compare(password ?? '', result.rows[0].password_hash))) throw new UnauthorizedException('Invalid credentials');
    return { accessToken: await this.jwt.signAsync({ sub: result.rows[0].id, username }), tokenType: 'Bearer' as const };
  }
}
