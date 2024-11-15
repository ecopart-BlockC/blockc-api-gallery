import { CampaignProject } from "src/campaign-project/entities/campaign-project.entity";
import { TransferProject } from "src/transfer-project/entities/transfer-project.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("tbl_renovacalc_valores")
export class RenewCalcProject {
  @PrimaryGeneratedColumn("increment", { type: "int" })
  ID: number;

  @Column({ type: "bigint", nullable: true })
  CompanyIdRecipient: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  CompanyName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  CompanyNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  CertificationProcess: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  BioFuel: string;

  @Column({ type: "decimal", precision: 20, scale: 4, nullable: true })
  VolumeEmission: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  InitialEmission: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  FinalEmission: string;

  @Column({ type: "datetime", nullable: true })
  CertificateExpirationDate: Date;

  @Column({ type: "varchar", length: 2000, nullable: true })
  BaseYear: string;

  @Column({ type: "varchar", length: 2000, nullable: true })
  EvidenceFiles: string;

  @Column({ type: "datetime", nullable: true })
  CriadoEm: Date;

  @Column({ type: "varchar", length: 10, nullable: true })
  FinanceBenefitsAnswer: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  Status: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  AuditFiles: string;

  @Column({ type: "bigint", nullable: true })
  AlteradoPor: number;

  @Column({ type: "float", nullable: true })
  Saldo: number;

  @Column({ type: "datetime", nullable: true })
  AlteradoEm: Date;

  @OneToMany(() => TransferProject, (transfer) => transfer.projeto, {
    nullable: false,
  })
  transacoes: TransferProject[];

  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "CriadoPor" })
  CriadoPor: Usuario;

  @OneToMany(
    () => CampaignProject,
    (campaignProject) => campaignProject.projeto
  )
  campaignProjects: CampaignProject[];
}
