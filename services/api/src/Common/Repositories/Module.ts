import { Module } from "@nestjs/common";
import { AugmentsRepository } from "@TftLegends/Common/Repositories/AugmentsRepository";
import { ChampionsRepository } from "@TftLegends/Common/Repositories/ChampionsRepository";


@Module({
  imports: [],
  exports: [AugmentsRepository,ChampionsRepository],
  providers: [AugmentsRepository,ChampionsRepository],
})
export class RepositoriesModule {}
