import { Injectable } from "@nestjs/common";
import { CompositionsRepository } from "@TftLegends/Common/Repositories/CompositionsRepository";
import { BaseStatsRequest } from "@TftLegends/Common/Dto/Requests/BaseStatsRequest";
import { DefaultValue } from "@TftLegends/Common/Constants/DefaultValue";
import { TftTier } from "@TftLegends/Common/Enums/TftTier";
import { TftSet } from "@TftLegends/Common/Enums/TftSet";
import FilterQueryRequest from "@TftLegends/Common/Dto/Requests/FilterQueryRequest";
import { ChatBotService } from "@TftLegends/Providers/ChatBot/Services/ChatBot";
import { BotNames } from "@TftLegends/Common/Enums/BotNames";


@Injectable()
export class CompositionService {

  constructor(private readonly compositionsRepository: CompositionsRepository, private readonly chatBotService: ChatBotService,) {}

  public async getRandomWinningCompositions(request: BaseStatsRequest) {
    const {
      limit = 1, tftSet = DefaultValue.TFT_SET, tftTier = DefaultValue.TFT_TIER
    } = request;
    return this.compositionsRepository.getRandomWinningCompositions({
      limit, tftSet: tftSet as TftSet, tftTier: tftTier as TftTier
    });
  }

  public async getQueryResult(request: FilterQueryRequest) {
    const {
      limit = 20, tftSet = DefaultValue.TFT_SET, tftTier = DefaultValue.TFT_TIER, placement = null, champions = [], traits = [], items = [], augments = [],
    } = request;
    const compositions = await this.compositionsRepository.getCompositions({
      limit, tftSet: tftSet as TftSet, tftTier: tftTier as TftTier, placement, champions, traits, items, augments
    });
    if (compositions.length === 0) {
      this.chatBotService.sendMessage({
        message: `No compositions found for ${JSON.stringify(request)}`, botName: BotNames.ERROR
      });
    }
    return compositions;
  }

}
