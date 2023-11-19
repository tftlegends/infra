import Repository from "@/common/repository";
import { PoolClient } from "pg";
import TftCompositionItemEntity from "@/domain/entities/tftCompositionItem";

export default class TftCompositionItemsRepository extends Repository {

  constructor() {
    super();
  }

  async insertItem(item: TftCompositionItemEntity, transaction?: PoolClient): Promise<TftCompositionItemEntity> {
    const client = transaction || await this.pool.getClient();
    const query = {
      text: 'INSERT INTO TftCompositionItems(summonerPuuid, matchId, itemName, summonerTier, placement, tftSet, championName) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [item.summonerpuuid, item.matchid, item.itemname, item.summonertier, item.placement, item.tftset, item.championname]
    };
    await client.query(query);
    if(!transaction) client.release();
    return item;
  }

}
