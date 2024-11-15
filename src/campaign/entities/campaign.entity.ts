import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CampaignCompany } from "src/campaign-company/entities/campaign-company.entity";
import { CampaignProject } from "src/campaign-project/entities/campaign-project.entity";
import { Company } from "src/company/entities/company.entity";
import { Transform } from "class-transformer";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity("tbl_campanha")
export class CampaignEntity {
  @PrimaryGeneratedColumn("uuid", { name: "ID" })
  id: string;

  @Column({ name: "Nome", type: "varchar", length: 255 })
  nome: string;

  @Column({ name: "Descricao", type: "text", nullable: true })
  descricao: string;

  @Column({ name: "DataIni", type: "datetime" })
  dataIni: Date;

  @Column({ name: "DataFim", type: "datetime" })
  dataFim: Date;

  @Column({ name: "ImagemCapa", type: "varchar", length: 255, nullable: true })
  imagemCapa: string;

  @Column({ name: "Ativo", type: "bit" })
  ativo: boolean;

  @CreateDateColumn({ name: "CriadoEm", type: "datetime" })
  criadoEm: Date;

  @Transform(({ value }: { value: Usuario }) => ({
    ID: value.ID,
    Nome: value.Nome,
    Empresa: value.Empresa,
  }))
  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "CriadoPor" })
  criadoPor: Usuario;

  @UpdateDateColumn({ name: "ModificadoEm", type: "datetime", nullable: true })
  modificadoEm: Date;

  @Transform(({ value }: { value: Usuario }) => ({
    ID: Number(value.ID),
    Nome: value?.Nome,
  }))
  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: true })
  @JoinColumn({ name: "ModificadoPor" })
  modificadoPor: Usuario;

  @ManyToOne(() => Company, (company) => company.ID, { nullable: false })
  @JoinColumn({ name: "CompanyId" })
  company: Company;

  @AfterLoad()
  convertIDsToNumber() {
    if (this.criadoPor?.ID) this.criadoPor.ID = Number(this.criadoPor.ID);
    if (this.modificadoPor?.ID)
      this.modificadoPor.ID = Number(this.modificadoPor.ID);
  }

  // Relação com CampaignProject
  @OneToMany(
    () => CampaignProject,
    (campaignProject) => campaignProject.campaign,
    {
      nullable: true,
    }
  )
  projects: CampaignProject[];

  // Relação com CampaignCompany
  @OneToMany(
    () => CampaignCompany,
    (campaignCompany) => campaignCompany.campaign,
    {
      nullable: true,
    }
  )
  companies: CampaignCompany[];
}
