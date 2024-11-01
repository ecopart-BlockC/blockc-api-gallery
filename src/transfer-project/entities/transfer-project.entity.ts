import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tbl_transferencia_projeto_go")
export class TransferProject {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column("bigint")
  EmpresaRecebedoraID: number;

  @Column("bigint")
  EmpresaEnviadoraID: number;

  @Column("int")
  ProjetoGoID: number;

  @Column({ type: "datetime" })
  CriadoEm: Date;

  @Column("bigint")
  CriadoPor: number;
}
