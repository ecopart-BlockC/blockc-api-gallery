import { Injectable } from "@nestjs/common";
import { CreateCampaignProjectDto } from "./dto/create-campaign-project.dto";
import { UpdateCampaignProjectDto } from "./dto/update-campaign-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProject } from "./entities/campaign-project.entity";
import { Repository } from "typeorm";

@Injectable()
export class CampaignProjectService {
  constructor(
    @InjectRepository(CampaignProject)
    private readonly campaignProjectRepository: Repository<CampaignProject>
  ) {}
  async create(createCampaignProjectDto: CreateCampaignProjectDto) {
    const campaignProject = this.campaignProjectRepository.create(
      createCampaignProjectDto
    );
    return await this.campaignProjectRepository.save(campaignProject);
  }

  findAll() {
    return this.campaignProjectRepository.find();
  }

  findOne(id: string) {
    return this.campaignProjectRepository.findOne({
      where: { campanhaProjetoId: id },
    });
  }

  update(
    id: { campanhaId: string; projetoId: number; campanhaProjetoId: string },
    updateCampaignProjectDto: UpdateCampaignProjectDto
  ) {
    return this.campaignProjectRepository.update(id, updateCampaignProjectDto);
  }
  removeAll() {
    return this.campaignProjectRepository.clear();
  }

  remove(id: number) {
    return `This action removes a #${id} campaignProject`;
  }
}
