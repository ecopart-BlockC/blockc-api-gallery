import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateNeutralizationDto } from "./dto/create-neutralization.dto";
import { UpdateNeutralizationDto } from "./dto/update-neutralization.dto";
import { Repository } from "typeorm";
import { Neutralization } from "./entities/neutralization.entity";
import { ErrorService } from "src/error/error.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { NeutralizeInventoryDto } from "./dto/neutralize-inventory.dto";
import { CampaignEntity } from "src/campaign/entities/campaign.entity";
import { CampaignService } from "src/campaign/campaign.service";
import { InvNeutralization } from "src/inv-neutralization/entities/inv-neutralization.entity";
import { InvNeutralizationService } from "src/inv-neutralization/inv-neutralization.service";
import { RouteInventoryService } from "src/route-inventory/route-inventory.service";
import { CampaignProjectService } from "src/campaign-project/campaign-project.service";
import { Company } from "src/company/entities/company.entity";

@Injectable()
export class NeutralizationService {
  constructor(
    @InjectRepository(Neutralization)
    private readonly neutralizationRepository: Repository<Neutralization>,
    private readonly campaignService: CampaignService,
    private readonly campaignProjectService: CampaignProjectService,
    private readonly invNeutralizationService: InvNeutralizationService,
    private readonly routeInventoryService: RouteInventoryService,
    private readonly errorService: ErrorService
  ) {}

  async create(createNeutralizationDto: CreateNeutralizationDto) {
    const user = new Usuario();
    user.ID = createNeutralizationDto.userId;

    const company = new Company();
    company.ID = createNeutralizationDto.companyId;

    try {
      const neutralization = this.neutralizationRepository.create({
        criadoPor: user,
        criadoEm: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .slice(0, -1),
        modificadoPor: user,
        modificadoEm: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .slice(0, -1),
        descricao: createNeutralizationDto.description,
        nome: createNeutralizationDto.name,
        company: company,
      });
      return await this.neutralizationRepository.save(neutralization);
    } catch (error) {
      this.errorService.create({
        App: "Gallery API",
        CriadoEm: new Date(),
        Descricao: error.message,
        Rotina: "create neutralization",
        Tela: "neutralization.service.ts",
        Requisicao: JSON.stringify(createNeutralizationDto),
      });
      throw new Error(error.message);
    }
  }

  async findAll(params?: { companyId?: number }) {
    return this.neutralizationRepository.find({
      where: {
        company: {
          ID: params.companyId,
        },
      },
      relations: {
        criadoPor: true,
        company: true,
      },
      select: {
        criadoPor: {
          Nome: true,
          Sobrenome: true,
          ID: true,
        },
      },
    });
  }

  async neutralizeInventory(neutralizeInventoryDto: NeutralizeInventoryDto) {
    try {
      const campaign = await this.campaignService.findCampaignDetails(
        neutralizeInventoryDto.campaignId
      );

      this.validateNeutralization(
        campaign,
        neutralizeInventoryDto.companyId,
        neutralizeInventoryDto.projects
      );

      const user = new Usuario();
      user.ID = neutralizeInventoryDto.userId;

      const invNeutralizations = neutralizeInventoryDto.projects.map(
        (project) => {
          const invNeutralization = new InvNeutralization();
          invNeutralization.criadoEm = new Date();
          invNeutralization.criadoPor = user;
          invNeutralization.inventarioId = neutralizeInventoryDto.inventoryId;
          invNeutralization.projetoGoId = project.projectId;
          invNeutralization.campanhaProjetoId = project.campaignProjectId;
          invNeutralization.quantidadeUsada = project.amount;

          return invNeutralization;
        }
      );

      const neutralization = this.neutralizationRepository.create({
        ativo: true,
        criadoEm: new Date(),
        criadoPor: user,
        descricao: neutralizeInventoryDto.description,
        modificadoEm: new Date(),
        modificadoPor: user,
        nome: neutralizeInventoryDto.name,
        neutralizations: invNeutralizations,
      });

      const createdNeutralization =
        await this.neutralizationRepository.save(neutralization);

      const invNeutralizationsPromises = neutralizeInventoryDto.projects.map(
        (project) => {
          return this.invNeutralizationService.create({
            amount: project.amount,
            companyId: neutralizeInventoryDto.companyId,
            inventoryId: neutralizeInventoryDto.inventoryId,
            projectGoId: project.projectId,
            campanhaProjetoId: project.campaignProjectId,
            userId: neutralizeInventoryDto.userId,
            NeutralizacaoId: createdNeutralization.id,
          });
        }
      );

      const campaignProjectUpdate = neutralizeInventoryDto.projects.map(
        async (project) => {
          const campaignProject = await this.campaignProjectService.findOne(
            project.campaignProjectId
          );
          return this.campaignProjectService.update(
            {
              projetoId: project.projectId,
              campanhaId: neutralizeInventoryDto.campaignId,
              campanhaProjetoId: project.campaignProjectId,
            },
            {
              saldo: campaignProject.saldo - project.amount,
            }
          );
        }
      );

      const routeInventory = await this.routeInventoryService.findOne(
        neutralizeInventoryDto.inventoryId
      );

      this.routeInventoryService.update(neutralizeInventoryDto.inventoryId, {
        ModificadoPor: neutralizeInventoryDto.userId,
        Saldo:
          routeInventory.Saldo -
          neutralizeInventoryDto.projects.reduce(
            (acc, value) => acc + value.amount,
            0
          ),
      });

      await Promise.all(invNeutralizationsPromises);
      await Promise.all(campaignProjectUpdate);

      return createdNeutralization;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  validateNeutralization(
    campaign: CampaignEntity,
    companyId: number,
    projects: {
      amount: number;
      campaignProjectId: string;
    }[]
  ) {
    const validations = {
      companyValidation: false,
      projectIdValidation: false,
    };
    campaign.companies.forEach((company) => {
      if (company.empresaId == companyId) validations.companyValidation = true;
    });
    if (!validations.companyValidation)
      throw new BadRequestException(
        "invalid operation: company dont exists in this campaign"
      );
    projects.forEach((project) => {
      campaign.projects.map((campaignProject) => {
        if (project.campaignProjectId == campaignProject.campanhaProjetoId)
          validations.projectIdValidation = true;
      });
    });
    if (!validations.projectIdValidation)
      throw new BadRequestException(
        "invalid operation: project dont exists in this campaign"
      );
    projects.forEach((project) => {
      campaign.projects.map((campaignProject) => {
        if (
          project.campaignProjectId == campaignProject.campanhaProjetoId &&
          project.amount > campaignProject.saldo
        ) {
          throw new BadRequestException(
            "invalid operation: this project dont have sufficient balance"
          );
        }
      });
    });
  }

  findOne(id: number) {
    return this.neutralizationRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        neutralizations: true,
      },
    });
  }

  deleteAll() {
    return this.neutralizationRepository.clear();
  }

  async update(id: number, updateNeutralizationDto: UpdateNeutralizationDto) {
    try {
      const neutralization = await this.neutralizationRepository.findOne({
        where: { id },
      });

      if (!neutralization) {
        throw new NotFoundException(`Neutralization with ID ${id} not found`);
      }

      Object.assign(neutralization, {
        ...updateNeutralizationDto,
        modificadoPor: updateNeutralizationDto.userId,
        modificadoEm: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .slice(0, -1),
      });

      return await this.neutralizationRepository.save(neutralization);
    } catch (error) {
      this.errorService.create({
        App: "Gallery API",
        CriadoEm: new Date(),
        Descricao: error.message,
        Rotina: "update neutralization",
        Tela: "neutralization.service.ts",
        Requisicao: JSON.stringify(updateNeutralizationDto),
      });
      throw new Error(error.message);
    }
  }
}
