import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from "@nestjs/common";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthMiddleware } from "./auth/auth.middleware";
import { CampaignModule } from "./campaign/campaign.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { ErrorModule } from "./error/error.module";
import { RenewCalcProjectModule } from "./renew-calc-project/renew-calc-project.module";
import { RouteInventoryModule } from "./route-inventory/route-inventory.module";
import { TokenModule } from "./token/token.module";
import { TransferProjectModule } from "./transfer-project/transfer-project.module";
import { NeutralizationModule } from "./neutralization/neutralization.module";
import { InvNeutralizationModule } from "./inv-neutralization/inv-neutralization.module";
import { UsuarioModule } from "./usuario/usuario.module";

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
    NeutralizationModule,
    InvNeutralizationModule,
    RouteInventoryModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController);
  }
}
