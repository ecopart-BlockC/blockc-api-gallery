import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_neutraliza_inventario')
export class InvNeutralization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'inventarioID', type: 'int', nullable: false })
  inventarioId: number;

  @Column({ name: 'projetoGoID', type: 'int', nullable: false })
  projetoGoId: number;

  @Column({ name: 'CriadoPor', type: 'bigint', nullable: false })
  criadoPor: number;

  @Column({ name: 'CriadoEm', type: 'datetime', nullable: false })
  criadoEm: Date;

  @Column({ name: 'QuantidadeUsada', type: 'float', nullable: false })
  quantidadeUsada: number;
}