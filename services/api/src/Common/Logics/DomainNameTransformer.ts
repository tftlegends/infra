import AugmentNames from '@TftLegends/Common/Constants/AugmentNames';
import ChampionNames from '@TftLegends/Common/Constants/ChampionNames';
import ItemNames from '@TftLegends/Common/Constants/ItemNames';
import TraitNames from '@TftLegends/Common/Constants/TraitNames';
import { StringDistanceLogic } from "@TftLegends/Common/Logics/StringDistance";

export class DomainNameTransformer {


  static convertChampionName(name: string): string {
    return StringDistanceLogic.getNearestFromList(name, ChampionNames);
  }

  static convertItemName(name: string): string {
    return StringDistanceLogic.getNearestFromList(name, ItemNames);
  }

  static convertTraitName(name: string): string {
    return StringDistanceLogic.getNearestFromList(name, TraitNames);
  }

  static convertAugmentName(name: string): string {
    return StringDistanceLogic.getNearestFromList(name, AugmentNames);
  }

}
