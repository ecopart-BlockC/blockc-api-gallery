import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_neutralizacao')
export class Neutralization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: false })
  criadoPor: number;

  @Column({ type: 'datetime', nullable: false })
  criadoEm: Date;

  @Column({ type: 'datetime', nullable: true })
  modificadoEm: Date;

  @Column({ type: 'bigint', nullable: true })
  modificadoPor: number;

  @Column({ type: 'varchar', length: 'max', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nome: string;

  @Column({ type: 'tinyint', nullable: false })
  ativo: boolean;
}
