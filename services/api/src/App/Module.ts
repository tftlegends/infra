import { Module } from '@nestjs/common';
import { HealthController } from "@TftLegends/Health/Controllers/Health";
import { HealthModule } from "@TftLegends/Health/Module";
import { MetaModule } from "@TftLegends/Meta/Module";
import { CompositionModule } from "@TftLegends/Composition/Module";

@Module({
  imports: [HealthModule,MetaModule,CompositionModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
