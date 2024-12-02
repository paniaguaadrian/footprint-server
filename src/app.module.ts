import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarbonFootprintModule } from './carbon-footprint/carbon-footprint.module';

@Module({
  imports: [CarbonFootprintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
