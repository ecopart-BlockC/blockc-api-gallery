import { ConfigModule, ConfigService } from "@nestjs/config";

import { Error } from "src/error/entities/error.entity";
import { Module } from "@nestjs/common";
import { Pais } from "src/pais/entities/pais.entity";
import { RenewCalcProject } from "src/renew-calc-project/entities/renew-calc-project.entity";
import { RouteInventory } from "src/route-inventory/entities/route-inventory.entity";
import { Token } from "src/token/entities/token.entity";
import { TransferProject } from "src/transfer-project/entities/transfer-project.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mssql",
        host: configService.get<string>("DB_HOST"),
        port: parseInt(configService.get<string>("DB_PORT")),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        entities: [
          Usuario,
          Token,
          TransferProject,
          Error,
          RenewCalcProject,
          RouteInventory,
          Pais,
        ],
        synchronize: false,
        extra: {
          options: {
            applicationName: configService.get<string>("DB_APP_NAME"),
            encrypt: true,
            trustServerCertificate: true,
          },
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
