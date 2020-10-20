import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { ScheduleModule } from '@nestjs/schedule';
import { RodonavesShippingCalculator } from './shipping-calculator';

@VendurePlugin({
  imports: [PluginCommonModule, ScheduleModule.forRoot()],
  configuration: (config) => {
    config.shippingOptions.shippingCalculators?.push(
      RodonavesShippingCalculator
    );
    return config;
  }
})
export class RodonavesPlugin {}
