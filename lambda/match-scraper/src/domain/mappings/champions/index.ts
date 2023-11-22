import MappingManager from "@/domain/mappings/manager";
import set92IndexMapping from "@/domain/mappings/champions/indices/set92";
import set92NameMapping from "@/domain/mappings/champions/names/set92";
import set10IndexMapping from "@/domain/mappings/champions/indices/set10";
import set10NameMapping from "@/domain/mappings/champions/names/set10";

export default class ChampionsMappingManager extends MappingManager {

  protected indexMapper: { [key: string]: {
      [key: string]: number
    } } = {
    "set92": set92IndexMapping,
    "set10": set10IndexMapping,
    "default": set10IndexMapping,
  };
  protected nameMapper: { [key: string]: {
      [key: string]: string
    } } = {
    "set92": set92NameMapping,
    "set10": set10NameMapping,
    "default": set10NameMapping,
  };
  constructor(version: string){
    super(version);
    this.rootPath = './champions';
  }
}
