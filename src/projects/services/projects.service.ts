import { ProjectUpdateInput } from './../dto/project-update.dto';
import { ProjectCreateInput } from '../dto/project-create.dto';
import { Project } from '../projects.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOneOrFail(+id);
  }

  async create(data: ProjectCreateInput): Promise<Project> {
    const newProject = this.projectsRepository.create(data);
    return await this.projectsRepository.save(newProject);
  }

  async update(id: string, data: ProjectUpdateInput): Promise<Project> {
    await this.projectsRepository.update(id, data);
    return await this.projectsRepository.findOneOrFail(+id);
  }

  async delete(id: string): Promise<DeleteResult> {
    await this.projectsRepository.findOneOrFail(id);
    return this.projectsRepository.delete(+id);
  }
}
