import { Controller, Get,} from '@nestjs/common';
import { CampanhaService } from './campaign.service';

@Controller('campaign')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @Get('campaign')
  findAll() {
    return this.campanhaService.listarCampanhasPorEmpresa();
  }

}
