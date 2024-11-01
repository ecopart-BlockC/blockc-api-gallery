import { Module } from "@nestjs/common";
import { TransferProjectService } from "./transfer-project.service";
import { TransferProjectController } from "./transfer-project.controller";
import { TransferProject } from "./entities/transfer-project.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ErrorModule } from "src/error/error.module";
import { UsuarioModule } from "src/usuario/usuario.module";
import { RenewCalcProjectModule } from "src/renew-calc-project/renew-calc-project.module";

@Module({
  controllers: [TransferProjectController],
  providers: [TransferProjectService],
  imports: [
    TypeOrmModule.forFeature([TransferProject]),
    ErrorModule,
    UsuarioModule,
    RenewCalcProjectModule,
  ],
})
export class TransferProjectModule {}
