import TraitsMappingManager from "@/domain/mappings/traits";

describe('TraitsMappingManager', () => {
  let traitsMappingManager: TraitsMappingManager;
  const tftSetVersion = "TFTSet9_2"
  const invalidName = "TFT9NoTraitLikeThat"
  const validName = "Set9_Ionia"
  const validId = 0;
  const validViewName = "Ionia"

  beforeAll(async () => {
    traitsMappingManager = new TraitsMappingManager(tftSetVersion);
    await traitsMappingManager.initializeMappings();
  });
  describe('convertStringToIndex', () => {
    it('should return the correct index', () => {
      const result = traitsMappingManager.convertStringToIndex(validName);
      expect(result).toEqual(validId);
    });

    it('should throw an error if the index does not exist', () => {
      expect(() => {
        traitsMappingManager.convertStringToIndex(invalidName);
      }).toThrowError("No index found for " + invalidName);
    });
  });

  describe('convertStringToName', () => {
    it('should return the correct name', () => {
      const result = traitsMappingManager.convertStringToName(validName);
      expect(result).toEqual(validViewName);
    });

    it('should throw an error if the name does not exist', () => {
      expect(() => {
        traitsMappingManager.convertStringToName(invalidName);
      }).toThrowError("No name found for " + invalidName);
    });
  });
});
