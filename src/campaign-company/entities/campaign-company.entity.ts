import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CampaignEntity } from "src/campaign/entities/campaign.entity";

@Entity("tbl_campanha_empresa")
export class CampaignCompany {
  @PrimaryColumn({ name: "CampanhaID", type: "char" })
  campanhaId: string;

  @PrimaryColumn({ name: "EmpresaID", type: "bigint" })
  empresaId: number;

  @Column({ name: "Ativo", type: "tinyint", nullable: false })
  ativo: boolean;

  @CreateDateColumn({ name: "CriadoEm", type: "datetime" })
  criadoEm: Date;

  @Column({ name: "CriadoPor", type: "bigint", nullable: false })
  criadoPor: number;

  @UpdateDateColumn({ name: "ModificadoEm", type: "datetime", nullable: true })
  modificadoEm: Date;

  @Column({ name: "ModificadoPor", type: "bigint", nullable: true })
  modificadoPor: number;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.companies, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "CampanhaID" }) // Definimos o JoinColumn aqui, no lado da FK
  campaign: CampaignEntity;
}
