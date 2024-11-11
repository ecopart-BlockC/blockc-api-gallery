import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  //@Transform(({ value }) => value.Nome) // Nao funciona pois precisa mapear o objeto (causa ausencia do dado no response)
  @Column({ type: "bigint", name: "CompanyId", nullable: false })
  CompanyId: number;

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

  constructor(partial?: Partial<RouteInventory>) {
    Object.assign(this, partial);
  }
}
