import MappingManager from "@/domain/mappings/manager";
import set92IndexMapping from "@/domain/mappings/items/indices/set92";
import set92NameMapping from "@/domain/mappings/items/names/set92";

export default class ItemsMappingManager extends MappingManager {
  constructor(version: string){
    super(version);
    this.rootPath = './items';
  }
  protected indexMapper: { [key: string]: {
      [key: string]: number
    } } = {
    "set92": set92IndexMapping,
    "default": set92IndexMapping,
  };
  protected nameMapper: { [key: string]: {
      [key: string]: string
    } } = {
    "set92": set92NameMapping,
    "default": set92NameMapping,
  };

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
