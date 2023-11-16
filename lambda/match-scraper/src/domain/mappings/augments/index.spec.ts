import AugmentsMappingManager from "@/domain/mappings/augments";

describe('AugmentsMappingManager', () => {
  let traitsMappingManager: AugmentsMappingManager;
  const invalidName = "TFT9NoItemLikeThat"
  const validName = "TFT9_Augment_VanquisherEmblem"
  const tftSetVersion = "TFTSet9_2"
  const validId = 320;
  const validViewName = "Vanquisher Crest"


  beforeAll(async () => {
    traitsMappingManager = new AugmentsMappingManager(tftSetVersion);
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
