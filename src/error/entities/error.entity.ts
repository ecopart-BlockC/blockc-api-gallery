import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tbl_erro")
export class Error {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  ID: number;

  @Column({ type: "varchar", length: 255 })
  App: string;

  @Column({ type: "varchar", length: 255 })
  Tela: string;

  @Column({ type: "varchar", length: 255 })
  Rotina: string;

  @Column({ type: "varchar", length: "max" })
  Descricao: string;

  @Column({ type: "varchar", length: "max", nullable: true })
  Requisicao?: string;

  @Column({ type: "datetime" })
  CriadoEm: Date;
}
