import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  getAllCompanies() {
    return this.companyRepository.find({
      relations: ["Usuarios"],
      where: { Ativo: 1 },
    });
  }

  getAllCompaniesByUser(user: Usuario) {
    return this.companyRepository.find({
      where: { Usuarios: user, Ativo: 1 },
    });
  }
}
