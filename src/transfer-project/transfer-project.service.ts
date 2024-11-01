import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTransferProjectDto } from "./dto/create-transfer-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TransferProject } from "./entities/transfer-project.entity";
import { Repository } from "typeorm";
import { ErrorService } from "src/error/error.service";
import { UsuarioService } from "src/usuario/usuario.service";
import { RenewCalcProjectService } from "src/renew-calc-project/renew-calc-project.service";

@Injectable()
export class TransferProjectService {
  constructor(
    @InjectRepository(TransferProject)
    private readonly transferProjectRepository: Repository<TransferProject>,
    private readonly errorService: ErrorService,
    private readonly userService: UsuarioService,
    private readonly renewCalcProjectService: RenewCalcProjectService
  ) {}
  async create(createTransferProjectDto: CreateTransferProjectDto) {
    const projectGo = await this.renewCalcProjectService.findOne(
      createTransferProjectDto.projectGoId
    );
    if (!projectGo)
      throw new NotFoundException("invalid operation: not found projectGo");

    if (projectGo.Status === "Transferido")
      throw new BadRequestException(
        "invalid operation: this projectGo already transferred"
      );

    if (projectGo.Status !== "Auditado")
      throw new BadRequestException(
        "invalid operation: the projectGo must be audited"
      );

    this.renewCalcProjectService.update(createTransferProjectDto.projectGoId, {
      Status: "Transferido",
    });

    if (
      !(await this.renewCalcProjectService.checkProjectOwnership(
        createTransferProjectDto.companyID,
        createTransferProjectDto.projectGoId
      ))
    )
      throw new ForbiddenException(
        "invalid operation: a company can only transfer a project that has been issued by it"
      );

    try {
      const project = this.transferProjectRepository.create({
        CriadoPor: createTransferProjectDto.userId,
        EmpresaEnviadoraID: createTransferProjectDto.companyID,
        EmpresaRecebedoraID: createTransferProjectDto.destinationCompanyId,
        ProjetoGoID: createTransferProjectDto.projectGoId,
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

  async findAll() {
    const [users, projects] = await Promise.all([
      this.userService.findAll(),
      this.transferProjectRepository.find(),
    ]);

    const userMap = new Map(users.map((user) => [user.ID, user]));

    return projects.map((project) => {
      const createdByUser = userMap.get(project.CriadoPor);

      return {
        id: Number(project.ID),
        destinationCompanyId: Number(project.EmpresaRecebedoraID),
        issuedCompanyId: Number(project.EmpresaEnviadoraID),
        projectGoId: Number(project.ProjetoGoID),
        createdAt: project.CriadoEm,
        createdBy: createdByUser
          ? `${createdByUser.Nome} ${createdByUser.Sobrenome}`
          : null,
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
