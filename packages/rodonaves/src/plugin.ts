import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { ScheduleModule } from '@nestjs/schedule';
import { createShippingCalculator } from './shipping-calculator';
import { RodonavesPluginOptions } from './types';

@VendurePlugin({
  imports: [PluginCommonModule, ScheduleModule.forRoot()],
  configuration: (config) => {
    config.shippingOptions.shippingCalculators?.push(
      createShippingCalculator(RodonavesPlugin.options)
    );
    return config;
  }
})
export class RodonavesPlugin {
  private static options: RodonavesPluginOptions;
  static init(options: RodonavesPluginOptions): typeof RodonavesPlugin {
    RodonavesPlugin.options = options;
    return this;
  }
}
