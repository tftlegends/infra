/* eslint-disable sonarjs/cognitive-complexity */

import FilterQueryRequest from "@TftLegends/Common/Dto/Requests/FilterQueryRequest";


export class FilterQueryLogic {
  static buildQuery({ champions, traits, items, augments, placement, limit }: FilterQueryRequest, select= []) {

    let query = `
    SELECT
      tc.summonerPuuid,
      tc.matchId,
      tc.playerLevel,
      tc.placement,
      tc.totalDamageToPlayers,
      tc.tftSet,
      tc.summonerTier,
      tc.composition
    FROM
      TftCompositions tc
  `;

    let joinConditions = [];
    let whereConditions = [];
    let parameters = [];
    let parameterIndex = 1;

    if (champions) for (const champion of champions) {
      joinConditions.push(`JOIN TftCompositionChampions tcc_champ_${parameterIndex} ON tc.matchId = tcc_champ_${parameterIndex}.matchId AND tc.summonerPuuid = tcc_champ_${parameterIndex}.summonerPuuid`);
      whereConditions.push(`tcc_champ_${parameterIndex}.championName = $${parameterIndex}`);
      parameters.push(champion.championName);
      parameterIndex++;

      if (champion.championTier !== undefined) {
        whereConditions.push(`tcc_champ_${parameterIndex - 1}.championTier = $${parameterIndex}`);
        parameters.push(champion.championTier);
        parameterIndex++;
      }
    }

    // Handle items
    if (items) for (const item of items) {
      joinConditions.push(`JOIN TftCompositionItems tci_${parameterIndex} ON tc.matchId = tci_${parameterIndex}.matchId AND tc.summonerPuuid = tci_${parameterIndex}.summonerPuuid`);
      whereConditions.push(`tci_${parameterIndex}.itemName = $${parameterIndex}`);
      parameters.push(item.itemName);
      parameterIndex++;

      if (item.championName !== undefined) {
        whereConditions.push(`tci_${parameterIndex - 1}.championName = $${parameterIndex}`);
        parameters.push(item.championName);
        parameterIndex++;
      }
    }

    // Handle traits
    if (traits) for (const trait of traits) {
      joinConditions.push(`JOIN TftCompositionTraits tct_${parameterIndex} ON tc.matchId = tct_${parameterIndex}.matchId AND tc.summonerPuuid = tct_${parameterIndex}.summonerPuuid`);
      whereConditions.push(`tct_${parameterIndex}.traitName = $${parameterIndex}`);
      parameters.push(trait.traitName);
      parameterIndex++;

    }

    // Handle augments
    if (augments) for (const augment of augments) {
      joinConditions.push(`JOIN TftCompositionAugments tca_${parameterIndex} ON tc.matchId = tca_${parameterIndex}.matchId AND tc.summonerPuuid = tca_${parameterIndex}.summonerPuuid`);
      whereConditions.push(`tca_${parameterIndex}.augmentName = $${parameterIndex}`);
      parameters.push(augment.augmentName);
      parameterIndex++;

    }

    // Handle placement
    if (placement !== undefined) {
      whereConditions.push(`tc.placement = $${parameterIndex}`);
      parameters.push(placement);
      parameterIndex++;
    }

    query += joinConditions.join(' ');
    if (whereConditions.length > 0) {
      query += ` WHERE ` + whereConditions.join(' AND ');
    }

    if (limit !== undefined) {
      query += ` LIMIT $${parameterIndex}`;
      parameters.push(limit);
      parameterIndex++;
    }
    return { query, params: parameters };
  }


}
