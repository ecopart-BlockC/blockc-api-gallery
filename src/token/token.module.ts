import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";

@Module({
  providers: [TokenService],
  imports: [TypeOrmModule.forFeature([Token])],
  exports: [TokenService],
})
export class TokenModule {}
