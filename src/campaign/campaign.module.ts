import { Module } from '@nestjs/common';
import { CampanhaService } from './campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampanhaEmpresaRepository } from './campanha-empresa.repository';
import { CampanhaEmpresaEntity } from './entities/campanha-empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampanhaEmpresaEntity])],
  providers: [CampanhaService, CampanhaEmpresaRepository],
  exports: [CampanhaEmpresaRepository, CampanhaService],
})
export class CampaignModule {}



