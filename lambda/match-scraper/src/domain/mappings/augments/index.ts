import MappingManager from "@/domain/mappings/manager";

export default class AugmentsMappingManager extends MappingManager {
  constructor(version: string){
    super(version);
    this.rootPath = './augments';
  }
}
