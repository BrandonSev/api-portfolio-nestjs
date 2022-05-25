import { ProjectUpdateInput } from './../dto/project-update.dto';
import { ProjectsService } from './../services/projects.service';
import { ProjectCreateInput } from '../dto/project-create.dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: ProjectUpdateInput,
  ): Promise<Project> {
    return this.projectServices.update(id, data);
  }
}
