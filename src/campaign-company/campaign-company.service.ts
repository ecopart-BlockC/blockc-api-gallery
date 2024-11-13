import { Injectable } from "@nestjs/common";
import { CreateCampaignCompanyDto } from "./dto/create-campaign-company.dto";
import { UpdateCampaignCompanyDto } from "./dto/update-campaign-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignCompany } from "./entities/campaign-company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CampaignCompanyService {
  constructor(
    @InjectRepository(CampaignCompany)
    private readonly campaignCompanyRepository: Repository<CampaignCompany>
  ) {}
  async create(createCampaignCompanyDto: CreateCampaignCompanyDto) {
    const campaignCompany = this.campaignCompanyRepository.create(
      createCampaignCompanyDto
    );
    return await this.campaignCompanyRepository.save(campaignCompany);
  }

  async removeAll() {
    return this.campaignCompanyRepository.clear();
  }

  findAll() {
    return this.campaignCompanyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} campaignCompany`;
  }

  update(id: number, updateCampaignCompanyDto: UpdateCampaignCompanyDto) {
    return `This action updates a #${id} campaignCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaignCompany`;
  }
}
