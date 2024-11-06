import { Controller, Get,} from '@nestjs/common';
import { CampanhaService } from './campaign.service';

@Controller('campanhas')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @Get()
  async listarCampanhasPorEmpresa() {
    return await this.campanhaService.listarCampanhasPorEmpresa();
  }

}
