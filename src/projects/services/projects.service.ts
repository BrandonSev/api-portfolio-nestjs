import { ProjectUpdateInput } from './../dto/project-update.dto';
import { ProjectCreateInput } from '../dto/project-create.dto';
import { Project } from '../projects.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async create(data: ProjectCreateInput): Promise<Project> {
    const newProject = this.projectsRepository.create(data);
    return await this.projectsRepository.save(newProject);
  }

  async update(id: string, data: ProjectUpdateInput): Promise<Project> {
    await this.projectsRepository.update(id, data);
    return await this.projectsRepository.findOneOrFail(+id);
  }
}
