import { Module } from "@nestjs/common";
import { CompositionController } from "@TftLegends/Composition/Controllers/Composition";
import { CompositionService } from "@TftLegends/Composition/Services/Composition";
import { RepositoriesModule } from "@TftLegends/Common/Repositories/Module";


@Module({
  imports: [RepositoriesModule],
  controllers: [CompositionController],
  providers: [CompositionService],
  exports: []
})
export class CompositionModule {}
