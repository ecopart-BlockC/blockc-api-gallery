import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tbl_campanha_empresa')
export class CampanhaEmpresa {
  @PrimaryColumn({ name: 'CampanhaID' })
  campanhaId: number;

  @PrimaryColumn({ name: 'EmpresaID' })
  empresaId: number;

  @Column({ name: 'Ativo', type: 'bit' })
  ativo: boolean;

  @CreateDateColumn({ name: 'CriadoEm', type: 'datetime' })
  criadoEm: Date;

  @Column({ name: 'CriadoPor', type: 'int' })
  criadoPor: number;

  @UpdateDateColumn({ name: 'ModificadoEm', type: 'datetime', nullable: true })
  modificadoEm: Date;

  @Column({ name: 'ModificadoPor', type: 'int', nullable: true })
  modificadoPor: number;

}
