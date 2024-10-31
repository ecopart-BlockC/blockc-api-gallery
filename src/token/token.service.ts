import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly usuarioRepository: Repository<Token>
  ) {}

  async findAll(): Promise<Token[]> {
    return await this.usuarioRepository.find();
  }

  async validateToken(tokenHash: string): Promise<boolean> {
    const foundToken = (await this.findAll()).filter((token) => {
      if (token.Token === tokenHash) return token;
    });

    if (!foundToken) {
      throw new Error("token not found");
    }

    if (
      new Date(foundToken[0].ValidoAte).getTime() < new Date().getTime() ||
      new Date(foundToken[0].CriadoEm).getTime() > new Date().getTime()
    ) {
      throw new Error("invalid token");
    }

    return true;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
