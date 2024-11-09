import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignEntity } from './entities/campaign.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CampaignService {

constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
) {}

  async findCampaignWithCompany(): Promise<CampaignEntity[]> {
    return await this.campaignRepository.find({
      select: {
        id: true,
        nome: true,
        criadoPor: {
          ID: true,
          Nome: true,
          Empresa: true
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
      },
    });
  }
 }
