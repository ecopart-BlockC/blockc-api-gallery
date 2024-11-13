import { Module } from "@nestjs/common";
import { NeutralizationService } from "./neutralization.service";
import { NeutralizationController } from "./neutralization.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Neutralization } from "./entities/neutralization.entity";
import { ErrorModule } from "src/error/error.module";
import { UsuarioModule } from "src/usuario/usuario.module";
import { CampaignModule } from "src/campaign/campaign.module";
import { InvNeutralizationModule } from "src/inv-neutralization/inv-neutralization.module";
import { RouteInventoryModule } from "src/route-inventory/route-inventory.module";
import { CampaignProjectModule } from "src/campaign-project/campaign-project.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Neutralization]),
    ErrorModule,
    UsuarioModule,
    CampaignModule,
    InvNeutralizationModule,
    RouteInventoryModule,
    CampaignProjectModule,
  ],
  controllers: [NeutralizationController],
  providers: [NeutralizationService],
})
export class NeutralizationModule {}
