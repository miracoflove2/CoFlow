import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DatabaseService } from '../../infrastructure/database.module';
import { AuthGuard } from '../auth/auth.guard';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  async list(@Req() request: { user: { sub: string } }) {
    const result = await this.db.query('SELECT p.id,p.name,p.created_at AS "createdAt" FROM projects p JOIN project_memberships m ON m.project_id=p.id WHERE m.user_id=$1 ORDER BY p.created_at DESC', [request.user.sub]);
    return result.rows;
  }
  @Post()
  async create(@Req() request: { user: { sub: string } }, @Body() body: { name: string }) {
    const name = body?.name?.trim();
    if (!name || name.length > 120) throw new BadRequestException('Project name must be 1-120 characters');
    const result = await this.db.query<{ id: string; name: string; createdAt: string }>(`WITH new_project AS (INSERT INTO projects (name,created_by) VALUES ($1,$2) RETURNING id,name,created_at), membership AS (INSERT INTO project_memberships (project_id,user_id,role) SELECT id,$2,'owner' FROM new_project) SELECT id,name,created_at AS "createdAt" FROM new_project`, [name, request.user.sub]);
    return result.rows[0];
  }
}
