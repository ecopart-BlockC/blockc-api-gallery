import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tbl_usuario")
export class Usuario {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  ID: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  Nome: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  Sobrenome: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  Tipo: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  Email: string;

  @Column({ type: "varchar", nullable: true })
  Senha: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Empresa: string;

  @Column({ type: "tinyint", nullable: false })
  Pendente: boolean;

  @Column({ type: "varchar", nullable: true })
  ChaveTemp: string;

  @Column({ type: "tinyint", nullable: false })
  Admin: boolean;

  @Column({ type: "int", nullable: false })
  Aprovado: number;

  @Column({ type: "bigint", nullable: true })
  AprovadoPor: number | null;

  @Column({ type: "tinyint", nullable: false })
  Ativo: boolean;

  @Column({ type: "datetime", nullable: false })
  CriadoEm: Date;

  @Column({ type: "datetime", nullable: true })
  ModificadoEm: Date | null;
}
