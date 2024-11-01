import { Injectable } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
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
