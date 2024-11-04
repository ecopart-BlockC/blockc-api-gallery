import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tbl_empresa_usuario')
export class EmpresaUsuario {
  @PrimaryColumn({ name: 'EmpresaID' })
  empresaId: number;

  @PrimaryColumn({ name: 'UsuarioID' })
  usuarioId: number;

  @Column({ name: 'Ativo', type: 'bit' })
  ativo: boolean;

  @CreateDateColumn({ name: 'CriadoEm', type: 'datetime' })
  criadoEm: Date;
}