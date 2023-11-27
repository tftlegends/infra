import CompositionVectorCalculator from "@/logics/compositionVectorCalculator";
import TraitsMappingManager from "@/domain/mappings/traits";
import ChampionsMappingManager from "@/domain/mappings/champions";
import { CompositionTraitResponse, CompositionUnitResponse } from "@/domain/types/composition";
import { TftSet } from "@/domain/enums/tftSet";
import { CHAMPIONS_VECTOR_LENGTH, TRAITS_VECTOR_LENGTH } from "@/domain/constants/database";
describe('compositionVectorCalculator', () => {
  let compositionVectorCalculator: CompositionVectorCalculator;
  let traitsMappingManager: TraitsMappingManager;
  let championsMappingManager: ChampionsMappingManager;
  beforeEach(async () => {
    traitsMappingManager = new TraitsMappingManager(TftSet.SET10);
    championsMappingManager = new ChampionsMappingManager(TftSet.SET10);
    await traitsMappingManager.initializeMappings();
    await championsMappingManager.initializeMappings();
    compositionVectorCalculator = new CompositionVectorCalculator(
      traitsMappingManager,
      championsMappingManager
    );
  });
  describe('calculateTraitsVector', () => {
    it('empty traits', () => {
      const traits = [] as CompositionTraitResponse[];
      const vector = compositionVectorCalculator.calculateTraitsVector(traits);
      expect(vector).toEqual(Array.from({ length: TRAITS_VECTOR_LENGTH }).fill(0));
    });
    it('one trait', () => {
      const traits = [
        {
          name: "Set10_Emo",
          num_units: 3,
          style: 0,
          tier_current: 1,
          tier_total: 3
        }
      ] as CompositionTraitResponse[];
      const vector = compositionVectorCalculator.calculateTraitsVector(traits);
      expect(vector).toEqual(Array.from({ length: TRAITS_VECTOR_LENGTH }).fill(0).map((_, index) => index === 0 ? 3 : 0));
    });
    it('multiple traits', () => {
      const traits = [
        {
          name: "Set10_Emo",
          num_units: 3,
          style: 0,
          tier_current: 1,
          tier_total: 3
        },
        {
          name: "Set10_Sentinel",
          num_units: 6,
          style: 0,
          tier_current: 1,
          tier_total: 3
        }
      ] as CompositionTraitResponse[];
      const vector = compositionVectorCalculator.calculateTraitsVector(traits);
      expect(vector).toEqual(Array.from({ length: TRAITS_VECTOR_LENGTH }).fill(0).map((_, index) => index === 0 ? 3 : (index === 1 ? 6 : 0)));
    });
  });
  describe('calculateChampionsVector should be calculated for', () => {
    it('empty champions', () => {
      const champions = [] as CompositionUnitResponse[];
      const vector = compositionVectorCalculator.calculateChampionsVector(champions);
      expect(vector).toEqual(Array.from({ length: CHAMPIONS_VECTOR_LENGTH }).fill(0));
    });
    it('one champion', () => {
      const champions = [
        {
          character_id: "TFT_Voidspawn",
          tier: 3
        }
      ] as CompositionUnitResponse[];
      const vector = compositionVectorCalculator.calculateChampionsVector(champions);
      expect(vector).toEqual(Array.from({ length: CHAMPIONS_VECTOR_LENGTH }).fill(0).map((_, index) => index === 0 ? 3 : 0));
    });
    it('multiple champions', () => {
      const champions = [
        {
          character_id: "TFT_Voidspawn",
          tier: 3
        },
        {
          character_id: "TFT_TrainingDummy",
          tier: 2
        }
      ] as CompositionUnitResponse[];
      const vector = compositionVectorCalculator.calculateChampionsVector(champions);
      expect(vector).toEqual(Array.from({ length: CHAMPIONS_VECTOR_LENGTH }).fill(0).map((_, index) => index === 0 ? 3 : (index === 1 ? 2 : 0)));
    });
    it('multiple champions with same name. Highest tier should be taken into consideration', () => {
      const champions = [
        {
          character_id: "TFT_Voidspawn",
          tier: 3
        },
        {
          character_id: "TFT_Voidspawn",
          tier: 2
        }
      ] as CompositionUnitResponse[];
      const vector = compositionVectorCalculator.calculateChampionsVector(champions);
      expect(vector).toEqual(Array.from({ length: CHAMPIONS_VECTOR_LENGTH }).fill(0).map((_, index) => index === 0 ? 3 : 0));
    });
  });
});
