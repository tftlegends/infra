import { Injectable } from "@nestjs/common";
import { ItemsRepository } from "@TftLegends/Common/Repositories/ItemsRepository";
import { ChampionBaseStatsRequest } from "@TftLegends/Common/Dto/Requests/ChampionBaseStatsRequest";


@Injectable()
export class MetaItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async getItemsByChampionName(request: ChampionBaseStatsRequest){
    return await this.itemsRepository.getItemsByChampionName(request);
  }

}
