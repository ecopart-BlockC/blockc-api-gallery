import { Injectable } from "@nestjs/common";
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
}