import { Module } from "@nestjs/common";
import { AugmentsRepository } from "@TftLegends/Common/Repositories/AugmentsRepository";
import { ChampionsRepository } from "@TftLegends/Common/Repositories/ChampionsRepository";
import { ItemsRepository } from "@TftLegends/Common/Repositories/ItemsRepository";


@Module({
  imports: [],
  exports: [AugmentsRepository,ChampionsRepository,ItemsRepository],
  providers: [AugmentsRepository,ChampionsRepository,ItemsRepository],
})
export class RepositoriesModule {}
