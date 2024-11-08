import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tbl_pais")
export class Pais {
  @PrimaryColumn({ type: "uniqueidentifier" })
  ID: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  Nome: string;

  @Column({ type: "char", length: 5, nullable: false })
  Moeda: string;

  @Column({ type: "tinyint", nullable: false })
  Ativo: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  Estado: string;

  @CreateDateColumn({ type: "datetime" })
  CriadoEm: Date;

  @UpdateDateColumn({ type: "datetime" })
  ModificadoEm: Date;

  constructor(pais?: Partial<Pais>) {
    Object.assign(this, pais);
  }
}
