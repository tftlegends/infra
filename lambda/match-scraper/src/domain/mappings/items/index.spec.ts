import ItemsMappingManager from "@/domain/mappings/items/index";

describe('ItemsMappingManager', () => {
  let traitsMappingManager: ItemsMappingManager;
  const setVersion = "TFTSet9_2";
  const invalidName = "TFT9NoItemLikeThat"
  const validName = "TFT_Item_Bloodthirster"
  const validId = 2;
  const validViewName = "Bloodthirster"

  beforeAll(async () => {
    traitsMappingManager = new ItemsMappingManager(setVersion);
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
