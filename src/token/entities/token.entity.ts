import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("tbl_token")
export class Token {
  @PrimaryColumn({ type: "varchar", length: 235, nullable: false })
  Token: string;

  @Column({ type: "bigint", nullable: true })
  UsuarioID: number;

  @Column({ type: "datetime", nullable: false })
  CriadoEm: Date;

  @Column({ type: "datetime", nullable: false })
  ValidoAte: Date;
}
