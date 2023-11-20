import { Module } from "@nestjs/common";
import { AugmentsRepository } from "@TftLegends/Common/Repositories/AugmentsRepository";
import { ChampionsRepository } from "@TftLegends/Common/Repositories/ChampionsRepository";
import { ItemsRepository } from "@TftLegends/Common/Repositories/ItemsRepository";
import { CompositionsRepository } from "@TftLegends/Common/Repositories/CompositionsRepository";


@Module({
  imports: [],
  exports: [AugmentsRepository,ChampionsRepository,ItemsRepository,CompositionsRepository],
  providers: [AugmentsRepository,ChampionsRepository,ItemsRepository,CompositionsRepository],
})
export class RepositoriesModule {}
