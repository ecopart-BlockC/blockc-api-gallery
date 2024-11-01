import { Injectable } from "@nestjs/common";
import { CreateRenewCalcProjectDto } from "./dto/create-renew-calc-project.dto";
import { UpdateRenewCalcProjectDto } from "./dto/update-renew-calc-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RenewCalcProject } from "./entities/renew-calc-project.entity";
import { Repository } from "typeorm";

@Injectable()
export class RenewCalcProjectService {
  constructor(
    @InjectRepository(RenewCalcProject)
    private readonly renewCalcProjectRepository: Repository<RenewCalcProject>
  ) {}
  create(createRenewCalcProjectDto: CreateRenewCalcProjectDto) {
    return "This action adds a new renewCalcProject";
  }

  findAll() {
    return this.renewCalcProjectRepository.find();
  }

  findOne(id: number) {
    return this.renewCalcProjectRepository.findOne({ where: { ID: id } });
  }

  async checkProjectOwnership(companyId: number, projectId: number) {
    const renewCalcProjects = await this.renewCalcProjectRepository.find();

    let valid = false;

    renewCalcProjects.forEach((project) => {
      if (
        Number(project.ID) === projectId &&
        Number(project.CompanyIdRecipient) === companyId
      )
        valid = true;
    });

    return valid;
  }

  update(id: number, updateRenewCalcProjectDto: UpdateRenewCalcProjectDto) {
    return this.renewCalcProjectRepository.update(
      id,
      updateRenewCalcProjectDto
    );
  }

  remove(id: number) {
    return `This action removes a #${id} renewCalcProject`;
  }
}
