import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity({ name: "tbl_empresa" })
export class Company {
  @PrimaryGeneratedColumn({ name: "ID", type: "bigint" })
  ID: number;

  @ManyToMany(() => Usuario, (user) => user.ID, { nullable: true })
  @JoinTable({
    name: "tbl_empresa_usuario",
    joinColumn: { name: "EmpresaID" },
    inverseJoinColumn: { name: "UsuarioID" },
  })
  Usuarios: Usuario[];

  @OneToMany(() => Company, (company) => company.ID, { nullable: true })
  @JoinColumn({ name: "MatrizID" })
  MatrizID: Company;

  @Column({ name: "Matriz", type: "tinyint" }) // boolean
  Matriz: number;

  @Column({ name: "RazaoSocial", type: "varchar" })
  RazaoSocial: string;

  @Column({ name: "CNPJ", type: "char", length: 14 })
  CNPJ: string;

  @Column({ name: "Emissao", type: "tinyint" })
  Emissao: number;

  @Column({ name: "Cidade", type: "varchar" })
  Cidade: string;

  @Column({ name: "UF", type: "varchar" })
  UF: string;

  @Column({ name: "Pais", type: "varchar" })
  Pais: string;

  @Column({ name: "Participacao", type: "tinyint" })
  Participacao: number;

  @Column({ name: "PercParticipacao", type: "numeric" })
  PercParticipacao: number;

  @Column({ name: "ControleOp", type: "tinyint" })
  ControleOp: number;

  @Column({ name: "Ativo", type: "tinyint" })
  Ativo: number; // boolean

  @CreateDateColumn({ name: "CriadoEm" })
  CriadoEm: Date;

  constructor(partial?: Partial<Company>) {
    Object.assign(this, partial);
  }
}
