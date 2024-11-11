import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNeutralizationDto } from './dto/create-neutralization.dto';
import { UpdateNeutralizationDto } from './dto/update-neutralization.dto';
import { Repository } from 'typeorm';
import { Neutralization } from './entities/neutralization.entity';
import { ErrorService } from 'src/error/error.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class NeutralizationService {
  constructor(
    @InjectRepository(Neutralization)
    private readonly neutralizationRepository: Repository<Neutralization>,
    private readonly errorService: ErrorService,
    private readonly userService: UsuarioService,
) {}

  async create(createNeutralizationDto: CreateNeutralizationDto) {
    try {
        const neutralization = this.neutralizationRepository.create({
          criadoPor: createNeutralizationDto.userId,
          criadoEm: new Date(),
          modificadoPor: null,
          modificadoEm: null,
          descricao: createNeutralizationDto.description,
          nome: createNeutralizationDto.name
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

  async findAll() {
    const [users, neutralizations] = await Promise.all([
          this.userService.findAll(),
          this.neutralizationRepository.find(),
    ]);

    const userMap = new Map(users.map((user) => [user.ID, user]));

    neutralizations.map((neutralization) => {
        const createdByUser = userMap.get(neutralization.criadoPor);
        const modifiedByUser = userMap.get(neutralization.modificadoPor);

        return {
          id: Number(neutralization.id),
          description: neutralization.descricao,
          name: neutralization.nome,
          createdBy: createdByUser
          ? `${createdByUser.Nome} ${createdByUser.Sobrenome}`
          : null,
          createdAt: neutralization.criadoEm,
          modifiedBy: modifiedByUser
          ? `${modifiedByUser.Nome} ${modifiedByUser.Sobrenome}`
          : null,
          modifiedAt: neutralization.modificadoEm,
        };
    })
  }

  findOne(id: number) {
    return this.neutralizationRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateNeutralizationDto: UpdateNeutralizationDto) {
    try {
      const neutralization = await this.neutralizationRepository.findOne({ where: { id } });
      
      if (!neutralization) {
        throw new NotFoundException(`Neutralization with ID ${id} not found`);
      }
  
      Object.assign(neutralization, {
        ...updateNeutralizationDto,
        modificadoPor: updateNeutralizationDto.userId,
        modificadoEm: new Date(),
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
