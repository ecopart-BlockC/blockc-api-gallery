import { Module } from '@nestjs/common';
import { CampanhaService } from './campaign.service';
import { CampanhaController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampanhaEntity } from './entities/campanha.entity';
import { CampanhaEmpresaEntity } from './entities/campanha-empresa.entity';

@Module({
  controllers: [CampanhaController],
  providers: [CampanhaService],
  imports: [
    TypeOrmModule.forFeature([CampanhaEntity,CampanhaEmpresaEntity]),
  ],
})
export class CampaignModule {}
