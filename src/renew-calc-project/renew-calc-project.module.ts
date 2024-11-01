import { Module } from "@nestjs/common";
import { RenewCalcProjectService } from "./renew-calc-project.service";
import { RenewCalcProjectController } from "./renew-calc-project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RenewCalcProject } from "./entities/renew-calc-project.entity";

@Module({
  controllers: [RenewCalcProjectController],
  providers: [RenewCalcProjectService],
  imports: [TypeOrmModule.forFeature([RenewCalcProject])],
  exports: [RenewCalcProjectService],
})
export class RenewCalcProjectModule {}
