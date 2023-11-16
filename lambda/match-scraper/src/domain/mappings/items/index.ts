import MappingManager from "@/domain/mappings/manager";

export default class ItemsMappingManager extends MappingManager {
  constructor(version: string){
    super(version);
    this.rootPath = './items';
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
}
