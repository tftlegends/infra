import Repository from "@/common/repository";
import { PoolClient } from "pg";
import TftCompositionEntity from "@/domain/entities/tftComposition";

export default class TftCompositonsRepository extends Repository {

  private static maximumDistance = 7;

  constructor() {
    super();
  }

  async insertComposition(composition: TftCompositionEntity, transaction?: PoolClient): Promise<TftCompositionEntity> {

    const client = transaction || await this.pool.getClient();
    const compositionString = JSON.stringify(composition.composition);

    const query = `INSERT INTO TftCompositions(summonerPuuid, matchId, composition, traitsVector,championsVector, playerLevel, placement, totalDamageToPlayers, tftSet, summonerTier) VALUES('${composition.summonerpuuid}', '${composition.matchid}', '${compositionString}', '[${composition.traitsVector}]', '[${composition.championsVector}]', ${composition.playerlevel}, ${composition.placement}, ${composition.totaldamagetoplayers}, '${composition.tftset}', '${composition.summonertier}') RETURNING * `
    await client.query(query);
    if (!transaction) client.release();
    return composition;
  }

  async getNearest(vector: number[], tftSet: string, k = 20) {
    const client = await this.pool.getClient();
    const query = `
      SELECT *
      FROM (
        SELECT
          summonerPuuid,
          matchId,
          placement,
          composition,
          compVector <-> '[${vector}]' AS distance,
          playerLevel,
          totalDamageToPlayers,
          tftSet,
          summonerTier
          
        FROM
          TftCompositions
        WHERE
          placement < 3
          AND 
          compVector <-> '[${vector}]' < ${TftCompositonsRepository.maximumDistance}
          AND 
          tftSet = '${tftSet}'
        ORDER BY compVector <-> '[${vector}]' ASC
      ) AS subquery
        LIMIT ${k}
      
      `;
    const result = await client.query(query);
    const rows = result.rows;
    await client.release();
    return rows;
  }

}
