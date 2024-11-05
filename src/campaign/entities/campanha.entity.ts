import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('tbl_campanha')
export class CampanhaEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'Nome', type: 'varchar', length: 255 })
  nome: string;

  @Column({ name: 'Descricao', type: 'text', nullable: true })
  descricao: string;

  @Column({ name: 'DataIni', type: 'datetime' })
  dataIni: Date;

  @Column({ name: 'DataFim', type: 'datetime' })
  dataFim: Date;

  @Column({ name: 'ImagemCapa', type: 'varchar', length: 255, nullable: true })
  imagemCapa: string;

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
