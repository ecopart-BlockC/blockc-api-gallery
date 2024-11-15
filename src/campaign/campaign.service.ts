import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignEntity } from "./entities/campaign.entity";
import { Repository } from "typeorm";
import { CreateCampaignDto } from "./dto/create-campaign.dto";
import { CampaignProjectService } from "src/campaign-project/campaign-project.service";
import { CampaignCompanyService } from "src/campaign-company/campaign-company.service";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { v4 } from "uuid";
import { CampaignProject } from "src/campaign-project/entities/campaign-project.entity";
import { CampaignCompany } from "src/campaign-company/entities/campaign-company.entity";
import { RenewCalcProjectService } from "src/renew-calc-project/renew-calc-project.service";
import { TransferProjectService } from "src/transfer-project/transfer-project.service";
import { Company } from "src/company/entities/company.entity";
@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    private readonly campaignProject: CampaignProjectService,
    private readonly renewCalcProjectService: RenewCalcProjectService,
    private readonly transferProjectService: TransferProjectService,
    private readonly campaignCompany: CampaignCompanyService
  ) {}

  async findCampaignWithCompany(params?: {
    companyId?: number;
  }): Promise<CampaignEntity[]> {
    return await this.campaignRepository.find({
      where: {
        company: { ID: params.companyId },
      },
      select: {
        id: true,
        nome: true,
        criadoPor: {
          ID: true,
          Nome: true,
          Empresa: true,
        },
        modificadoPor: {
          ID: true,
          Nome: true,
        },
        descricao: true,
        dataIni: true,
        dataFim: true,
        imagemCapa: true,
        ativo: true,
        criadoEm: true,
        modificadoEm: true,
      },
      relations: {
        criadoPor: true,
        modificadoPor: true,
        company: true,
      },
    });
  }

  async deleteAll() {
    await this.campaignRepository.clear();
    return { message: "ok" };
  }

  async create(createCampaignDto: CreateCampaignDto) {
    const user = new Usuario();
    try {
      const renewCalcProjects = await this.renewCalcProjectService.findAll();

      const transferProjects = await this.transferProjectService.findAll();

      this.validateCampaign(
        renewCalcProjects,
        transferProjects,
        createCampaignDto.projects
      );

      user.ID = createCampaignDto.userId;

      const createCompany = new Company({
        ID: createCampaignDto.createdCompanyId,
      });

      const campaignId = v4();

      const campaignProjectIds = [];

      const projects = createCampaignDto.projects.map((project) => {
        //aqui
        const campaignProjectId = v4();
        campaignProjectIds.push(campaignProjectId);
        const campaignProject = new CampaignProject();

        campaignProject.campanhaId = campaignId;
        campaignProject.projetoId = project.id;
        campaignProject.campanhaProjetoId = campaignProjectId;
        campaignProject.ativo = true;
        campaignProject.criadoEm = new Date();
        campaignProject.criadoPor = 1;
        campaignProject.modificadoEm = new Date();
        campaignProject.modificadoPor = 1;
        campaignProject.quantidade = project.quantity;
        campaignProject.saldo = project.quantity;
        return campaignProject;
      });

      const companies = createCampaignDto.companyIds.map((companyId) => {
        const campaignCompany = new CampaignCompany();
        campaignCompany.ativo = true;
        campaignCompany.campanhaId = campaignId;
        campaignCompany.criadoEm = new Date();
        campaignCompany.criadoPor = createCampaignDto.userId;
        campaignCompany.empresaId = companyId;
        campaignCompany.modificadoEm = new Date();
        campaignCompany.modificadoPor = createCampaignDto.userId;
        return campaignCompany;
      });

      const campaign = this.campaignRepository.create({
        ...createCampaignDto,
        ativo: true,
        criadoEm: new Date(),
        criadoPor: user,
        modificadoPor: user,
        modificadoEm: new Date(),
        id: campaignId,
        projects: projects,
        companies: companies,
        company: createCompany,
      });

      const createdCampaign = await this.campaignRepository.save(campaign);

      await this.upateProjectBalance(createCampaignDto.projects);

      const projectPromises = createCampaignDto.projects.map(
        //aqui
        async (project, index) => {
          return this.campaignProject.create({
            ativo: true,
            campanhaProjetoId: campaignProjectIds[index],
            campanhaId: createdCampaign.id,
            criadoEm: new Date(),
            criadoPor: createCampaignDto.userId,
            projetoId: project.id,
            modificadoEm: new Date(),
            modificadoPor: createCampaignDto.userId,
            quantidade: project.quantity,
            saldo: project.quantity,
          });
        }
      );
      await Promise.all(projectPromises);

      const companyPromises = createCampaignDto.companyIds.map(
        async (companyId) => {
          return this.campaignCompany.create({
            ativo: true,
            campanhaId: createdCampaign.id,
            criadoEm: new Date(),
            criadoPor: createCampaignDto.userId,
            empresaId: companyId,
            modificadoEm: new Date(),
            modificadoPor: createCampaignDto.userId,
          });
        }
      );
      await Promise.all(companyPromises);

      return createdCampaign;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  validateCampaign(
    renewCalcs: {
      type: string;
      projectId: number;
      status: string;
      unit: string;
      initialVolume: number;
      balance: number;
    }[],
    transferences: {
      id: number;
      destinationCompanyId: number;
      issuedCompanyId: number;
      projectGoId: number;
      quantity: number;
      balance: number;
      type: string;
      unit: string;
      createdBy: {
        name: string;
        lastName: string;
        email: string;
      };
    }[],
    campaignProjects: { id: number; quantity: number; type: string }[]
  ) {
    campaignProjects.forEach((project) => {
      if (project.type === "GOGAS") {
        const foundedProject = renewCalcs.filter((renewCalc) => {
          if (renewCalc.projectId === project.id) return renewCalc;
        });
        if (foundedProject.length === 0)
          throw new Error("invalid operation: gogas project not found");
        if (foundedProject[0].balance < project.quantity)
          throw new Error(
            "invalid operation: invalid balance for this gogas project"
          );
      }
      if (project.type === "GOGAS_TRANSF") {
        const foundedTransferedProject = transferences.filter(
          (transference) => {
            if (transference.projectGoId === project.id) return transference;
          }
        );
        if (foundedTransferedProject.length === 0)
          throw new Error(
            "invalid operation: gogas transfered project not found"
          );
        if (foundedTransferedProject[0].balance < project.quantity)
          throw new Error(
            "invalid operation: invalid balance for this gogas transfered project"
          );
      }
    });
  }

  async upateProjectBalance(
    campaignProjects: { id: number; quantity: number; type: string }[]
  ) {
    const updatebalances = campaignProjects.map(async (campaignProject) => {
      if (campaignProject.type === "GOGAS") {
        const renewCalcProject = await this.renewCalcProjectService.findOne(
          campaignProject.id
        );

        return this.renewCalcProjectService.update(campaignProject.id, {
          Saldo: renewCalcProject.Saldo - campaignProject.quantity,
        });
      }
      if (campaignProject.type === "GOGAS_TRANSF") {
        const transferProject =
          await this.transferProjectService.findByProjectId(campaignProject.id);

        return this.transferProjectService.updateBalance(
          transferProject[0].ID,
          transferProject[0].Saldo - campaignProject.quantity
        );
      }
    });
    await Promise.all(updatebalances);
  }

  async findCampaignDetails(id: string) {
    return this.campaignRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        projects: true,
        companies: true,
      },
    });
  }
}
