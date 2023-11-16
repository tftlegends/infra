import MappingManager from "@/domain/mappings/manager";
import set92IndexMapping from "@/domain/mappings/champions/indices/set92";
import set92NameMapping from "@/domain/mappings/champions/names/set92";

export default class ChampionsMappingManager extends MappingManager {

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
  constructor(version: string){
    super(version);
    this.rootPath = './champions';
  }
}
