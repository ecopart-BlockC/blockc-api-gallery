import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateInvNeutralizationDto } from "./dto/create-inv-neutralization.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { InvNeutralization } from "./entities/inv-neutralization.entity";
import { Repository } from "typeorm";
import { ErrorService } from "src/error/error.service";
import { RenewCalcProjectService } from "src/renew-calc-project/renew-calc-project.service";
import { RenewCalcProject } from "src/renew-calc-project/entities/renew-calc-project.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Neutralization } from "src/neutralization/entities/neutralization.entity";

@Injectable()
export class InvNeutralizationService {
  constructor(
    @InjectRepository(InvNeutralization)
    private readonly invNeutralizationRepository: Repository<InvNeutralization>,
    private readonly errorService: ErrorService,
    private readonly renewCalcProjectService: RenewCalcProjectService
  ) {}

  async create(createInvNeutralizationDto: CreateInvNeutralizationDto) {
    const user = new Usuario();
    user.ID = createInvNeutralizationDto.userId;

    const projectGo = await this.renewCalcProjectService.findOne(
      createInvNeutralizationDto.projectGoId
    );

    const routeInventoryBalance = 10000; // mocked balance

    this.validateNeutralization(
      createInvNeutralizationDto.amount,
      routeInventoryBalance,
      projectGo
    );

    const neutralization = new Neutralization();

    neutralization.id = createInvNeutralizationDto.NeutralizacaoId;

    try {
      const project = this.invNeutralizationRepository.create({
        campanhaProjetoId: createInvNeutralizationDto.campanhaProjetoId,
        inventarioId: createInvNeutralizationDto.inventoryId,
        projetoGoId: createInvNeutralizationDto.projectGoId,
        criadoPor: user,
        criadoEm: new Date(),
        quantidadeUsada: createInvNeutralizationDto.amount,
        neutralization: neutralization,
      });

      return await this.invNeutralizationRepository.save(project);
    } catch (error) {
      this.errorService.create({
        App: "Gallery API",
        CriadoEm: new Date(),
        Descricao: error.message,
        Rotina: "create inventory neutralization",
        Tela: "inv-neutralization.service.ts",
        Requisicao: JSON.stringify(createInvNeutralizationDto),
      });
      throw new Error(error.message);
    }
  }

  deleteAll() {
    return this.invNeutralizationRepository.clear();
  }

  validateNeutralization(
    amount: number,
    inventoryBalance: number,
    projectGo?: RenewCalcProject
  ) {
    if (!projectGo)
      throw new NotFoundException("invalid operation: project not found");
    if (amount > inventoryBalance)
      throw new BadRequestException(
        "invalid operation: amount is greater than inventoryBalance"
      );
  }

  findAll() {
    return this.invNeutralizationRepository.find();
  }

  findOne(id: number) {
    return this.invNeutralizationRepository.findOne({ where: { id: id } });
  }
}
