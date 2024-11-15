import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Company } from "src/company/entities/company.entity";
import { InvNeutralization } from "src/inv-neutralization/entities/inv-neutralization.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity("tbl_neutralizacao")
export class Neutralization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime", nullable: false })
  criadoEm: Date;

  @Column({ type: "datetime", nullable: true })
  modificadoEm: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "ModificadoPor" })
  modificadoPor: Usuario;

  @Column({ type: "varchar", length: "max", nullable: true })
  descricao: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  nome: string;

  @Column({ type: "tinyint", nullable: false })
  ativo: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "CriadoPor" })
  criadoPor: Usuario;

  @ManyToOne(() => Company, (company) => company.ID, { nullable: true })
  @JoinColumn({ name: "CompanyId" })
  company: Company;

  @OneToMany(
    () => InvNeutralization,
    (invNeutralization) => invNeutralization.neutralization,
    {
      nullable: true,
    }
  )
  neutralizations: InvNeutralization[];
}
