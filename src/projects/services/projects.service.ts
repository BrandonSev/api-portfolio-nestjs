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
    const newProject = await this.projectsRepository
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values(data)
      .execute();
    const project = await this.projectsRepository.findOneOrFail(
      newProject.identifiers['id'],
    );
    return project;
  }
}
