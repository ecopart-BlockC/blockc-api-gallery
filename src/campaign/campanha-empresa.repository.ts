import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CampanhaEmpresaEntity } from './entities/campanha-empresa.entity';

@Injectable()
export class CampanhaEmpresaRepository extends Repository<CampanhaEmpresaEntity> {

  constructor(private dataSource: DataSource) {

    super(CampanhaEmpresaEntity, dataSource.createEntityManager());
  }

  async findCampaignWithCompany(): Promise<CampanhaEmpresaEntity[]> {
    const query = `
      SELECT
        C.ID,
        C.Nome,
        C.Descricao,
        C.DataIni,
        C.DataFim,
        C.ImagemCapa,
        C.Ativo,
        C.CriadoEm,
        C.CriadoPor,
        C.ModificadoEm,
        C.ModificadoPor,
        E.EmpresaID
      FROM tbl_campanha AS C
      FULL JOIN tbl_campanha_empresa AS E
      ON C.ID = E.CampanhaID
    `;
    return await  this.dataSource.query(query);
  }
}
