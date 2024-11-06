import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { UsuarioModule } from "./usuario/usuario.module";
import { TokenModule } from "./token/token.module";
import { TransferProjectModule } from "./transfer-project/transfer-project.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { ErrorModule } from './error/error.module';
import { RenewCalcProjectModule } from './renew-calc-project/renew-calc-project.module';
import { CampanhaModule } from './campaign/campaign.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuarioModule,
    TokenModule,
    TransferProjectModule,
    ErrorModule,
    RenewCalcProjectModule,
    CampanhaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController);
  }
}
