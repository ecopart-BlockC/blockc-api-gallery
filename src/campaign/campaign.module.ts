import { Module } from '@nestjs/common';
import { CampanhaService } from './campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampanhaEmpresaEntity } from './entities/campanha-empresa.entity';
import { CampanhaEntity } from './entities/campanha.entity';
import { CampanhaController } from './campaign.controller';
import { CampanhaEmpresaRepository } from './campanha-empresa.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CampanhaEmpresaEntity,CampanhaEntity])],
  controllers: [CampanhaController],
  providers: [CampanhaService, CampanhaEmpresaRepository],
  exports: [CampanhaEmpresaRepository,CampanhaService],
})
export class CampanhaModule {}



