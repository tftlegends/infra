import { Module } from "@nestjs/common";
import { AugmentsRepository } from "@TftLegends/Common/Repositories/AugmentsRepository";


@Module({
  imports: [AugmentsRepository],
  exports: [AugmentsRepository],
  providers: [AugmentsRepository],
})
export class RepositoriesModule {}
