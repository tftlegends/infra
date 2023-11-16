import MappingManager from "@/domain/mappings/manager";

export default class ChampionsMappingManager extends MappingManager {
  constructor(version: string){
    super(version);
    this.rootPath = './champions';
  }
}
