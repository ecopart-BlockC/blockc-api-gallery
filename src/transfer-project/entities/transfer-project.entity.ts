import { RenewCalcProject } from "src/renew-calc-project/entities/renew-calc-project.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

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

  @Column("float")
  Quantidade: number;

  @Column({ type: "float", nullable: true })
  Saldo: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "CriadoPor" })
  CriadoPor: Usuario;

  @ManyToOne(() => RenewCalcProject, (projeto) => projeto.transacoes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ProjetoGoID" })
  projeto: RenewCalcProject;
}
