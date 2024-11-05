import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity('tbl_empresa_usuario')
export class EmpresaUsuarioEntity {
  @PrimaryGeneratedColumn({ name: 'EmpresaID' })
  empresaId: number;

  @PrimaryGeneratedColumn({ name: 'UsuarioID' })
  usuarioId: number;

  @Column({ name: 'Ativo', type: 'bit' })
  ativo: boolean;

  @CreateDateColumn({ name: 'CriadoEm', type: 'datetime' })
  criadoEm: Date;
}