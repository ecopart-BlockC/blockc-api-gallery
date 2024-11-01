import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Error } from "./entities/error.entity";
import { Repository } from "typeorm";
import { CreateErrorDto } from "./dto/create-error.dto";

@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(Error)
    private readonly errorRepository: Repository<Error>
  ) {}
  async create(createErrorDto: CreateErrorDto) {
    const error = this.errorRepository.create(createErrorDto);
    return await this.errorRepository.save(error);
  }

  findAll() {
    return this.errorRepository.find();
  }

  findOne(id: number) {
    return this.errorRepository.findOne({ where: { ID: id } });
  }
}
