import { Module } from "@nestjs/common";
import { RepositoriesModule } from "@TftLegends/Common/Repositories/Module";
import { AugmentsController } from "@TftLegends/Meta/Controllers/Augments";
import { AugmentsService } from "@TftLegends/Meta/Services/Augments";

@Module({
  imports: [RepositoriesModule],
  controllers: [AugmentsController],
  providers: [AugmentsService],
})
export class MetaModule {}
