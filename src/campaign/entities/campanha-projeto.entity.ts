import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('tbl_campanha_projeto')
export class CampanhaProjetoEntity {
  @PrimaryGeneratedColumn({ name: 'CampanhaID' })
  campanhaId: number;

  @PrimaryGeneratedColumn({ name: 'ProjetoID' })
  projetoId: number;

  @Column({ name: 'Ativo', type: 'bit' })
  ativo: boolean;

  @Column({ name: 'CriadoEm', type: 'datetime' })
  criadoEm: Date;

  @CreateDateColumn({ name: 'CriadoPor', type: 'int' })
  criadoPor: number;

  @UpdateDateColumn({ name: 'ModificadoEm', type: 'datetime', nullable: true })
  modificadoEm: Date;

  @Column({ name: 'ModificadoPor', type: 'int', nullable: true })
  modificadoPor: number;
}