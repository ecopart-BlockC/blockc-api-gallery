import { Injectable } from '@nestjs/common';
import { CampanhaEmpresaRepository } from './campanha-empresa.repository';
@Injectable()
export class CampanhaService {

  constructor(

    private readonly campanhaEmpresaRepository: CampanhaEmpresaRepository){}

  async listarCampanhasPorEmpresa() {
    return await this.campanhaEmpresaRepository.findCampaignWithCompany();
  }
  }
