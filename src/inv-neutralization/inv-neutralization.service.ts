import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvNeutralizationDto } from './dto/create-inv-neutralization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InvNeutralization } from './entities/inv-neutralization.entity';
import { DataSource, Repository } from 'typeorm';
import { ErrorService } from 'src/error/error.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RenewCalcProjectService } from 'src/renew-calc-project/renew-calc-project.service';
import { RenewCalcProject } from 'src/renew-calc-project/entities/renew-calc-project.entity';
// import { UpdateRenewCalcProjectDto } from 'src/renew-calc-project/dto/update-renew-calc-project.dto';
import { UpdateInvNeutralizationDto } from './dto/update-inv-neutralization.dto';

@Injectable()
export class InvNeutralizationService {
  constructor(
    @InjectRepository(InvNeutralization)
    private readonly invNeutralizationRepository: Repository<InvNeutralization>,
    private readonly errorService: ErrorService,
    private readonly userService: UsuarioService,
    private readonly renewCalcProjectService: RenewCalcProjectService,
    private readonly dataSource: DataSource,
  ) {}
  
  
  async create(createInvNeutralizationDto: CreateInvNeutralizationDto) {
    // const projectGo = await this.renewCalcProjectService.findOne(
    //   createInvNeutralizationDto.projectGoId
    // );

    // await this.validateNeutralization(
    //   projectGo,
    //   createInvNeutralizationDto.companyId,
    //   createInvNeutralizationDto.userId,
    //   createInvNeutralizationDto.amount,
    // );

    try {
      const project = this.invNeutralizationRepository.create({
        inventarioId: createInvNeutralizationDto.inventoryId,
        projetoGoId: createInvNeutralizationDto.projectGoId,
        criadoPor: createInvNeutralizationDto.userId,
        criadoEm: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .slice(0, -1),
        quantidadeUsada: createInvNeutralizationDto.userId,
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

  // async validateNeutralization(
  //   projectGo: RenewCalcProject,
  //   companyId: number,
  //   userId: number,
  //   amount: number,
  // ) {
  //   const inventoryLimit = this.getGOProjectBalance(projectGo.ID);
  //   if (!projectGo)
  //     throw new NotFoundException("invalid operation: not found projectGo");

  //   if (!(await this.userService.findOne(userId)))
  //     throw new NotFoundException("invalid operation: user not found on database");

  //   if (amount > (await inventoryLimit).Saldo)
  //     throw new BadRequestException("amount used is greater than the amount available for this project");
  // }

  
  // async getGOProjectBalance(projectGoId: number) {
  //   type ProjectGo = {ID: number, CompanyName: string, Status: string, Saldo: number}

  //   const project: ProjectGo = await this.renewCalcProjectService.findOne(projectGoId);
    
  //   if(project.Status === "Auditado")
  //     throw new BadRequestException("invalid operation: projectGo must be audited before usage");
  //   return project;

  // }

  findAll() {
    return `This action returns all invNeutralization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invNeutralization`;
  }

  update(id: number, updateInvNeutralizationDto: UpdateInvNeutralizationDto){
    return `This action returns all invNeutralization`;
  }
}
