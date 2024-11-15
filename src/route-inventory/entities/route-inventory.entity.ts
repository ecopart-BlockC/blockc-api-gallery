import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Company } from "src/company/entities/company.entity";
import { InvNeutralization } from "src/inv-neutralization/entities/inv-neutralization.entity";
import { Pais } from "src/pais/entities/pais.entity";
import { Transform } from "class-transformer";
import { Usuario } from "src/usuario/entities/usuario.entity";

@UseInterceptors(ClassSerializerInterceptor)
@Entity({ name: "tbl_inventario_rota" })
export class RouteInventory {
  @PrimaryGeneratedColumn("increment", { type: "int", name: "ID" })
  ID: number;

  @Column({ type: "varchar", name: "Nome", length: 255, nullable: false })
  Nome: string;

  @ManyToOne(() => Company, (company) => company.ID, { nullable: false })
  @JoinColumn({ name: "CompanyId" })
  Company: Company;

  @Column({ type: "varchar", length: 50, name: "Status", nullable: false })
  Status: string;

  @Column({ type: "tinyint", name: "Ativo", nullable: false })
  Ativo: number;

  @Transform(({ value }: { value: Usuario }) => ({
    ID: value.ID,
    Nome: value.Nome,
  }))
  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "CriadoPor" })
  CriadoPor: Usuario;

  @Column({ type: "float", name: "tCO2e", nullable: true })
  tCO2e: number;

  @Column({ type: "float", name: "Saldo", nullable: true })
  Saldo: number;

  @Transform(({ value }: { value: Pais }) => value.Nome)
  @ManyToOne(() => Pais, (pais) => pais.ID, { nullable: false })
  @JoinColumn({ name: "CountryID" })
  Country: Pais;

  @CreateDateColumn({ type: "datetime", name: "CriadoEm", nullable: false })
  CriadoEm: Date;

  @Transform(({ value }: { value: Usuario }) => ({
    ID: value.ID,
    Nome: value.Nome,
  }))
  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "ModificadoPor" })
  ModificadoPor: Usuario;

  @UpdateDateColumn({ type: "datetime", name: "ModificadoEm", nullable: true })
  ModificadoEm: Date;

  @OneToMany(
    () => InvNeutralization,
    (invNeutralization) => invNeutralization.routeInventory,
    {
      nullable: true,
    }
  )
  neutralizations: InvNeutralization[];

  constructor(partial?: Partial<RouteInventory>) {
    Object.assign(this, partial);
  }
}
