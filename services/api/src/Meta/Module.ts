import { Module } from "@nestjs/common";
import { RepositoriesModule } from "@TftLegends/Common/Repositories/Module";
import { MetaAugmentsController } from "@TftLegends/Meta/Controllers/Augments";
import { MetaAugmentsService } from "@TftLegends/Meta/Services/Augments";
import { MetaChampionsController } from "@TftLegends/Meta/Controllers/Champions";
import { MetaChampionsService } from "@TftLegends/Meta/Services/Champions";

@Module({
  imports: [RepositoriesModule],
  controllers: [MetaAugmentsController, MetaChampionsController],
  providers: [MetaAugmentsService, MetaChampionsService],
})
export class MetaModule {}
