import { Module } from '@nestjs/common';
import { NeutralizationService } from './neutralization.service';
import { NeutralizationController } from './neutralization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neutralization } from './entities/neutralization.entity';
import { ErrorModule } from 'src/error/error.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Neutralization]), ErrorModule, UsuarioModule],
  controllers: [NeutralizationController],
  providers: [NeutralizationService],
})
export class NeutralizationModule {}
