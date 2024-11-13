import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    try {
      await this.tokenService.validateToken(token);
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
