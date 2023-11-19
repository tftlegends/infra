import Repository from "@/common/repository";
import TftCompositionTraitEntity from "@/domain/entities/tftCompositionTrait";
import { PoolClient } from "pg";

export default class TftCompositionTraitsRepository extends Repository {
  constructor() {
    super();
  }

  async insertTrait(trait: TftCompositionTraitEntity, transaction: PoolClient): Promise<TftCompositionTraitEntity> {
    const client = transaction || await this.pool.getClient();
    const query = {
      text: 'INSERT INTO TftCompositionTraits(summonerPuuid, matchId, traitName, traitTier, summonerTier, placement, tftSet) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [trait.summonerpuuid, trait.matchid, trait.traitname, trait.traittier, trait.summonertier, trait.placement, trait.tftset]
    };
    await client.query(query);
    if(!transaction) client.release();
    return trait;
  }
}
