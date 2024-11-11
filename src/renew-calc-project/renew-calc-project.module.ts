import { Module, forwardRef } from "@nestjs/common";
import { RenewCalcProjectService } from "./renew-calc-project.service";
import { RenewCalcProjectController } from "./renew-calc-project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RenewCalcProject } from "./entities/renew-calc-project.entity";
import { TransferProjectModule } from "src/transfer-project/transfer-project.module";

@Module({
  controllers: [RenewCalcProjectController],
  providers: [RenewCalcProjectService],
  imports: [
    TypeOrmModule.forFeature([RenewCalcProject]),
    forwardRef(() => TransferProjectModule), // Usando forwardRef aqui também
  ],
  exports: [RenewCalcProjectService],
})
export class RenewCalcProjectModule {}
