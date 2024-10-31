import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { TokenService } from "./token/token.service";
import { Token } from "./token/entities/token.entity";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tokenService: TokenService
  ) {}

  @Get()
  async getUsuarios(): Promise<Token[]> {
    return await this.tokenService.findAll();
  }
}
