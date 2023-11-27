import TraitsMappingManager from "@/domain/mappings/traits";
import { CompositionTraitResponse, CompositionUnitResponse } from "@/domain/types/composition";
import { CHAMPIONS_VECTOR_LENGTH, TRAITS_VECTOR_LENGTH } from "@/domain/constants/database";
import ChampionsMappingManager from "@/domain/mappings/champions";


export default class CompositionVectorCalculator {
  constructor(private readonly traitsMappingManager: TraitsMappingManager, private readonly championsMappingManager: ChampionsMappingManager) {}

  public calculateTraitsVector(traits: CompositionTraitResponse[]): number[] {
    const vector = Array.from({ length: TRAITS_VECTOR_LENGTH }).fill(0) as number[];

    for (const trait of traits) {
      const traitIndex = this.traitsMappingManager.convertStringToIndex(trait.name);
      vector[traitIndex] = trait.num_units as number;
    }
    return vector;
  }

  public calculateChampionsVector(champions:  CompositionUnitResponse[]): number[] {
    const vector = Array.from({ length: CHAMPIONS_VECTOR_LENGTH }).fill(0) as number[];

    for (const champion of champions) {
      const championIndex = this.championsMappingManager.convertStringToIndex(champion.character_id);
      vector[championIndex] = Math.max(vector[championIndex], champion.tier);
    }
    return vector;
  }

}
