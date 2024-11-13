import { Neutralization } from "src/neutralization/entities/neutralization.entity";
import { RouteInventory } from "src/route-inventory/entities/route-inventory.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("tbl_neutraliza_inventario")
export class InvNeutralization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inventarioID", type: "int", nullable: false })
  inventarioId: number;

  @Column({ name: "projetoGoID", type: "int", nullable: false })
  projetoGoId: number;

  @Column({ name: "campanhaProjetoID", type: "varchar", nullable: false })
  campanhaProjetoId: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.ID, { nullable: false })
  @JoinColumn({ name: "CriadoPor" })
  criadoPor: Usuario;

  @Column({ name: "CriadoEm", type: "datetime", nullable: false })
  criadoEm: Date;

  @Column({ name: "QuantidadeUsada", type: "float", nullable: false })
  quantidadeUsada: number;

  @ManyToOne(
    () => Neutralization,
    (neutralization) => neutralization.neutralizations,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "NeutralizacaoId" }) // Substitua com o nome correto da FK
  neutralization: Neutralization;

  @ManyToOne(
    () => RouteInventory,
    (routeInventory) => routeInventory.neutralizations,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "inventarioID" }) // Substitua com o nome correto da FK
  routeInventory: RouteInventory;
}
