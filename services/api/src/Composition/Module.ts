import { Module } from "@nestjs/common";
import { CompositionController } from "@TftLegends/Composition/Controllers/Composition";
import { CompositionService } from "@TftLegends/Composition/Services/Composition";
import { RepositoriesModule } from "@TftLegends/Common/Repositories/Module";
import { ChatBotModule } from "@TftLegends/Providers/ChatBot/Module";


@Module({
  imports: [RepositoriesModule,ChatBotModule],
  controllers: [CompositionController],
  providers: [CompositionService],
  exports: []
})
export class CompositionModule {}
