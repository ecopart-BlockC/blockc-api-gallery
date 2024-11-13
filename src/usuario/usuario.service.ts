import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOne({ where: { ID: id } });
  }
}
