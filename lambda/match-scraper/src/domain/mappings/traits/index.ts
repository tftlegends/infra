import MappingManager from "@/domain/mappings/manager";

export default class TraitsMappingManager extends MappingManager {
  constructor(version: string){
    super(version);
    this.rootPath = './traits';
  }
}
