import { Injectable } from '@nestjs/common';
import { CampanhaEntity } from './entities/campanha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CampanhaEmpresaRepository } from './campanha-empresa.repository';
@Injectable()
export class CampanhaService {

  constructor(
    @InjectRepository(CampanhaEntity)
    private readonly campanhaEmpresaRepository: CampanhaEmpresaRepository){}

  async listarCampanhasPorEmpresa() {
      const campaigns = await this.campanhaEmpresaRepository.findCampaignWithCompany();
      return campaigns;
  }
}
