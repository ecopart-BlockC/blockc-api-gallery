import { Module } from "@nestjs/common";
import { ErrorService } from "./error.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Error } from "./entities/error.entity";
import { ErrorController } from "./error.controller";

@Module({
  controllers: [ErrorController],
  providers: [ErrorService],
  imports: [TypeOrmModule.forFeature([Error])],
  exports: [ErrorService],
})
export class ErrorModule {}
