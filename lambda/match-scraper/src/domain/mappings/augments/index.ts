import MappingManager from "@/domain/mappings/manager";
import set92IndexMapping from "./indices/set92";
import set92NameMapping from "./names/set92";
import set10IndexMapping from "./indices/set10";
import set10NameMapping from "./names/set10";
export default class AugmentsMappingManager extends MappingManager {

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
    this.rootPath = './augments';
  }
}
