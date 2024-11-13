import { Injectable } from "@nestjs/common";
import { UpdateRenewCalcProjectDto } from "./dto/update-renew-calc-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RenewCalcProject } from "./entities/renew-calc-project.entity";
import { Repository } from "typeorm";
import { TransferProjectService } from "src/transfer-project/transfer-project.service";

@Injectable()
export class RenewCalcProjectService {
  constructor(
    @InjectRepository(RenewCalcProject)
    private readonly renewCalcProjectRepository: Repository<RenewCalcProject>,
    private readonly transferProjectService: TransferProjectService
  ) {}

  async findAll() {
    return (await this.renewCalcProjectRepository.find()).map((project) => {
      return {
        type: "GOGAS",
        projectId: project.ID,
        status: project.Status,
        unit: "m3",
        initialVolume: Number(project.VolumeEmission),
        balance: Number(project.Saldo),
      };
    });
  }

  async findAllActivies(companyId: number) {
    const issuedProjects = await this.renewCalcProjectRepository.find({
      where: {
        CompanyIdRecipient: companyId,
      },
    });

    const receivedProjects =
      await this.transferProjectService.findProjectsReceived(companyId);

    const sendedProjects =
      await this.transferProjectService.findProjectsSended(companyId);

    return {
      issuedProjects: issuedProjects,
      receivedProjects: receivedProjects,
      sendedProjects: sendedProjects,
    };
  }

  async findOne(id: number) {
    const renewCalcProject = await this.renewCalcProjectRepository.findOne({
      where: { ID: id },
      relations: {
        transacoes: true,
        CriadoPor: true,
      },
      select: {
        CriadoPor: {
          Nome: true,
          Sobrenome: true,
          ID: true,
        },
      },
    });

    renewCalcProject.AuditFiles;

    return {
      ...renewCalcProject,
      AuditFiles: JSON.parse(renewCalcProject.AuditFiles),
    };
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

  async updateAll() {
    const allRenewCalcs = await this.renewCalcProjectRepository.find();
    allRenewCalcs.forEach((renewCalc) => {
      this.renewCalcProjectRepository.update(renewCalc.ID, {
        Saldo: renewCalc.VolumeEmission,
      });
    });
    return { message: "OK" };
  }

  update(id: number, updateRenewCalcProjectDto: UpdateRenewCalcProjectDto) {
    return this.renewCalcProjectRepository.update(
      id,
      updateRenewCalcProjectDto
    );
  }
}
