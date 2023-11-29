import {StringDistanceLogic} from "@/common/stringDistanceLogic";

export class MappingManager {
  protected version: string;
  protected nameMapping: { [key: string]: string }| undefined;
  protected indexMapping: { [key: string]: number } | undefined;
  static versionMapping: { [key: string]: string } = {
    "default": "set10",
    "TFTSet9_2": "set92",
    "TFTSet10": "set10"
  };
  protected rootPath: string;
  protected errorMessage = "Mapping not initialized";
  protected indexMapper: { [key: string]: {
    [key: string]: number
    } } = {};
  protected nameMapper: { [key: string]: {
    [key: string]: string
    } } = {};

  constructor(version: string) {
    this.version = version;
    this.rootPath = './';
  }
  async initializeMappings(){


      if(MappingManager.versionMapping.hasOwnProperty(this.version)) {
        const versionName = MappingManager.versionMapping[this.version];
        this.nameMapping = this.nameMapper[versionName]!;
        this.indexMapping = this.indexMapper[versionName]!;
      }else{
        console.warn(`Enum with version ${this.version} not found, fallback to default enum.`);
        const versionName = MappingManager.versionMapping["default"];
        this.nameMapping = this.nameMapper[versionName]!;
        this.indexMapping = this.indexMapper[versionName]!;
    }
  }
  convertStringToIndex(input: string): number {
    if(this.indexMapping === undefined){
      throw new Error(this.errorMessage);
    }
    const targetKey = Object.keys(this.indexMapping).find(key => key.toLowerCase().includes(input.toLowerCase()));
    if(targetKey === undefined){
      throw new Error(`No index found for ${input}`);
    }
    return this.indexMapping[targetKey];

  }

  convertStringToName(input: string): string {
    if(this.nameMapping === undefined){
      throw new Error(this.errorMessage);
    }
    const targetKey = Object.keys(this.nameMapping).find(key => key.toLowerCase().includes(input.toLowerCase()));
    if(targetKey === undefined){
      throw new Error(`No name found for ${input}`);
    }
    return this.nameMapping[targetKey];
  }

  get length(): number {
    if(this.nameMapping === undefined){
      throw new Error(this.errorMessage);
    }
    return Object.keys(this.nameMapping).length;
  }

  convertNearestStringToIndex(input: string): number {
    const nearest = StringDistanceLogic.getNearestFromList(input, Object.keys(this.indexMapping!));
    return this.convertStringToIndex(nearest);
  }
  convertNearestStringToName(input: string): string {
    const nearest = StringDistanceLogic.getNearestFromList(input, Object.keys(this.nameMapping!));
    return this.convertStringToName(nearest);
  }
}

export default MappingManager;
