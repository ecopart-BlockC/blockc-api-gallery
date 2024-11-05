import { Controller, Get,} from '@nestjs/common';
import { CampanhaService } from './campaign.service';

@Controller('campanhas')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @Get()
  findAll() {
    return this.campanhaService.listarCampanhasPorEmpresa();
  }

}
