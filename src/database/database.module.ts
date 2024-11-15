import { ConfigModule, ConfigService } from "@nestjs/config";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

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
        entities: ["dist/**/*.entity.js"],
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
