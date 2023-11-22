import TraitsMappingManager from "@/domain/mappings/traits";
import { CompositionTraitResponse } from "@/domain/types/composition";
import { COMPOSITION_VECTOR_LENGTH } from "@/domain/constants/database";


export default class CompositionVectorCalculator {
  constructor(private readonly traitsMappingManager: TraitsMappingManager) {}

  public calculateVector(traits: CompositionTraitResponse[]) : number[] {
    const vector = Array.from({ length: COMPOSITION_VECTOR_LENGTH }).fill(0)

    for (const trait of traits) {
      const traitIndex = this.traitsMappingManager.convertStringToIndex(trait.name);
      vector[traitIndex] = trait.num_units as number;
    }
    return vector as number[];
  }
}
