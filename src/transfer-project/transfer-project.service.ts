import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTransferProjectDto } from "./dto/create-transfer-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TransferProject } from "./entities/transfer-project.entity";
import { Repository } from "typeorm";
import { ErrorService } from "src/error/error.service";
import { RenewCalcProjectService } from "src/renew-calc-project/renew-calc-project.service";
import { RenewCalcProject } from "src/renew-calc-project/entities/renew-calc-project.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class TransferProjectService {
  constructor(
    @InjectRepository(TransferProject)
    private readonly transferProjectRepository: Repository<TransferProject>,
    private readonly errorService: ErrorService,
    @Inject(forwardRef(() => RenewCalcProjectService))
    private readonly renewCalcProjectService: RenewCalcProjectService
  ) {}
  async create(createTransferProjectDto: CreateTransferProjectDto) {
    const projectGo = await this.renewCalcProjectService.findOne(
      createTransferProjectDto.projectGoId
    );

    await this.validateTransfer(
      projectGo,
      createTransferProjectDto.projectGoId,
      createTransferProjectDto.companyID,
      createTransferProjectDto.quantity
    );

    this.renewCalcProjectService.update(createTransferProjectDto.projectGoId, {
      Saldo: projectGo.Saldo
        ? Number(projectGo.Saldo) - createTransferProjectDto.quantity
        : Number(projectGo.VolumeEmission) - createTransferProjectDto.quantity,
    });

    const user = new Usuario();

    user.ID = createTransferProjectDto.userId;

    try {
      const project = this.transferProjectRepository.create({
        CriadoPor: user,
        EmpresaEnviadoraID: createTransferProjectDto.companyID,
        EmpresaRecebedoraID: createTransferProjectDto.destinationCompanyId,
        ProjetoGoID: createTransferProjectDto.projectGoId,
        Quantidade: createTransferProjectDto.quantity,
        Saldo: createTransferProjectDto.quantity,
        CriadoEm: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .slice(0, -1),
      });

      return await this.transferProjectRepository.save(project);
    } catch (error) {
      this.errorService.create({
        App: "Gallery API",
        CriadoEm: new Date(),
        Descricao: error.message,
        Rotina: "create transfer project",
        Tela: "transfer-project.service.ts",
        Requisicao: JSON.stringify(createTransferProjectDto),
      });
      throw new Error(error.message);
    }
  }

  async validateTransfer(
    projectGo: RenewCalcProject,
    projectGoId: number,
    companyId: number,
    quantity: number
  ) {
    if (quantity > projectGo.Saldo)
      throw new NotFoundException(
        "invalid operation: the project balance is less than the requested quantity"
      );
    if (!projectGo)
      throw new NotFoundException("invalid operation: not found projectGo");

    if (projectGo.Status !== "Auditado")
      throw new BadRequestException(
        "invalid operation: the projectGo must be audited"
      );
    if (
      !(await this.renewCalcProjectService.checkProjectOwnership(
        companyId,
        projectGoId
      ))
    )
      throw new ForbiddenException(
        "invalid operation: a company can only transfer a project that has been issued by it"
      );
  }

  async findAll() {
    return (
      await this.transferProjectRepository.find({
        relations: {
          CriadoPor: true,
        },
        select: {
          CriadoPor: {
            Nome: true,
            Sobrenome: true,
            Email: true,
          },
        },
      })
    ).map((transference) => {
      return {
        id: Number(transference.ID),
        destinationCompanyId: Number(transference.EmpresaRecebedoraID),
        issuedCompanyId: Number(transference.EmpresaEnviadoraID),
        projectGoId: Number(transference.ProjetoGoID),
        quantity: Number(transference.Quantidade),
        balance: Number(transference.Saldo),
        createdBy: {
          name: transference.CriadoPor.Nome,
          lastName: transference.CriadoPor.Sobrenome,
          email: transference.CriadoPor.Email,
        },
      };
    });
  }

  async deleteAll() {
    const transferProjects = await this.transferProjectRepository.find();

    return transferProjects.forEach(async (project) => {
      await this.transferProjectRepository.delete({
        ID: project.ID,
      });
    });
  }

  findOne(id: number) {
    return this.transferProjectRepository.findOne({
      where: {
        ID: id,
      },
    });
  }
}
