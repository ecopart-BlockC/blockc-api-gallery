import { Module } from '@nestjs/common';
import { InvNeutralizationService } from './inv-neutralization.service';
import { InvNeutralizationController } from './inv-neutralization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvNeutralization } from './entities/inv-neutralization.entity';
import { ErrorModule } from 'src/error/error.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { RenewCalcProjectModule } from 'src/renew-calc-project/renew-calc-project.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvNeutralization]), ErrorModule, UsuarioModule, RenewCalcProjectModule],
  controllers: [InvNeutralizationController],
  providers: [InvNeutralizationService],
})
export class InvNeutralizationModule {}
