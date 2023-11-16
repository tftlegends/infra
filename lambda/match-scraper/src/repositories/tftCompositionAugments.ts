import Repository from "@/common/repository";
import TftCompositionAugmentEntity from "@/domain/entities/tftCompositionAugment";
import { PoolClient } from "pg";

export default class TftCompositionAugmentsRepository extends Repository {
  constructor() {
    super();
  }

  async insertAugment(augment: TftCompositionAugmentEntity, transaction?: PoolClient): Promise<TftCompositionAugmentEntity> {
    const client = transaction || await this.pool.getClient();
    const query = {
      text: 'INSERT INTO TftCompositionAugments(summonerPuuid, matchId, augmentName, summonerTier, placement, tftSet) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [augment.summonerpuuid, augment.matchid, augment.augmentname, augment.summonertier, augment.placement, augment.tftset]
    };
    await client.query(query);
    if(!transaction) client.release();
    return augment;
  }
}
