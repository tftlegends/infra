import { Module } from '@nestjs/common';
import { HealthService } from '@TftLegends/Health/Services/Health';
import { HealthController } from '@TftLegends/Health/Controllers/Health';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  exports: [HealthService],
  providers: [HealthService],
  controllers: [HealthController],
  imports: [TerminusModule],
})
export class HealthModule {}
