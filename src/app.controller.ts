import { Controller, Get, Headers, HttpStatus, Res } from "@nestjs/common";
import { TokenService } from "./token/token.service";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async testToken(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      message: "token valid",
    });
  }
}
