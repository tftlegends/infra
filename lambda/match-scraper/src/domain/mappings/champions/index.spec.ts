import ChampionsMappingManager from "@/domain/mappings/champions/index";

describe('ChampionsMappingManager', () => {
  let traitsMappingManager: ChampionsMappingManager;
  const setVersion = "TFTSet9_2";
  const invalidName = "TFT9NoChampLikeThat"
  const validName = "TFT9b_Aatrox"
  const validId = 68;
  const validViewName = "Aatrox"

  beforeAll(async () => {
    traitsMappingManager = new ChampionsMappingManager(setVersion);
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
