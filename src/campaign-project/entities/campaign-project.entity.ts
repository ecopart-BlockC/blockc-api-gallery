import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { RenewCalcProject } from "src/renew-calc-project/entities/renew-calc-project.entity";
import { CampaignEntity } from "src/campaign/entities/campaign.entity";

@Entity("tbl_campanha_projeto")
export class CampaignProject {
  @PrimaryColumn({ name: "CampanhaID", type: "varchar" })
  campanhaId: string;

  @PrimaryColumn({ name: "ProjetoID", type: "varchar" })
  projetoId: number;

  @Column({ name: "CampanhaProjetoID", type: "varchar", nullable: false })
  campanhaProjetoId: string;

  @Column({ name: "Ativo", type: "tinyint", nullable: false })
  ativo: boolean;

  @Column({ name: "CriadoEm", type: "datetime", nullable: false })
  criadoEm: Date;

  @Column({ name: "CriadoPor", type: "bigint", nullable: false })
  criadoPor: number;

  @Column({ name: "ModificadoEm", type: "datetime", nullable: true })
  modificadoEm: Date;

  @Column({ name: "ModificadoPor", type: "bigint", nullable: true })
  modificadoPor: number;

  @Column({ name: "Saldo", type: "float", nullable: false })
  saldo: number;

  @Column({ name: "Quantidade", type: "float", nullable: true })
  quantidade: number;

  @ManyToOne(() => RenewCalcProject, (project) => project.campaignProjects)
  @JoinColumn({ name: "ProjetoID" })
  projeto: RenewCalcProject;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.projects, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "CampanhaID" }) // Definimos o JoinColumn aqui, no lado da FK
  campaign: CampaignEntity;
}
