import { Module } from "@nestjs/common";
import { RepositoriesModule } from "@TftLegends/Common/Repositories/Module";
import { MetaAugmentsController } from "@TftLegends/Meta/Controllers/Augments";
import { MetaAugmentsService } from "@TftLegends/Meta/Services/Augments";
import { MetaChampionsController } from "@TftLegends/Meta/Controllers/Champions";
import { MetaChampionsService } from "@TftLegends/Meta/Services/Champions";
import { MetaItemsController } from "@TftLegends/Meta/Controllers/Items";
import { MetaItemsService } from "@TftLegends/Meta/Services/Items";

@Module({
  imports: [RepositoriesModule],
  controllers: [MetaAugmentsController, MetaChampionsController, MetaItemsController],
  providers: [MetaAugmentsService, MetaChampionsService, MetaItemsService],
})
export class MetaModule {}
