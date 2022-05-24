import { ProjectsService } from './../services/projects.service';
import { ProjectCreateInput } from '../dto/project-create.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Project } from '../projects.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private projectServices: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectServices.findAll();
  }

  @Post()
  create(@Body() data: ProjectCreateInput): Promise<Project> {
    return this.projectServices.create(data);
  }
}
