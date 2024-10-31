import { Controller, Get, Headers, HttpStatus, Res } from "@nestjs/common";
import { TokenService } from "./token/token.service";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async testToken(
    @Headers("authorization") authHeader: string,
    @Res() res: Response
  ) {
    const token = authHeader?.split(" ")[1];
    try {
      await this.tokenService.validateToken(token);
      return res.status(HttpStatus.OK).json({
        message: "token valid",
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
      });
    }
  }
}
