import MappingManager from "@/domain/mappings/manager";

export default class ItemsMappingManager extends MappingManager {
  constructor(version: string){
    super(version);
    this.rootPath = './items';
  }
}
