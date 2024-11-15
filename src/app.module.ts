import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from "@nestjs/common";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthMiddleware } from "./auth/auth.middleware";
import { CampaignCompanyModule } from "./campaign-company/campaign-company.module";
import { CampaignModule } from "./campaign/campaign.module";
import { CampaignProjectModule } from "./campaign-project/campaign-project.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { ErrorModule } from "./error/error.module";
import { InvNeutralizationModule } from "./inv-neutralization/inv-neutralization.module";
import { NeutralizationModule } from "./neutralization/neutralization.module";
import { RenewCalcProjectModule } from "./renew-calc-project/renew-calc-project.module";
import { RouteInventoryModule } from "./route-inventory/route-inventory.module";
import { TokenModule } from "./token/token.module";
import { TransferProjectModule } from "./transfer-project/transfer-project.module";
import { UsuarioModule } from "./usuario/usuario.module";

const APP_PROTECTED_ROUTES = "*";

const isDevMode = process.env.NODE_ENV === "development";

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
    CampaignProjectModule,
    CampaignCompanyModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (!isDevMode)
      consumer.apply(AuthMiddleware).forRoutes(APP_PROTECTED_ROUTES);
  }
}
