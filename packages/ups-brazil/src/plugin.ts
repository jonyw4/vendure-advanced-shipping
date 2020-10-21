import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { createShippingCalculator } from './shipping-calculator';
import { createCustomFulfillmentProcess } from './custom-fullfilment-proccess';
import { UPSBrazilPluginOptions } from './types';

/**
 * To use you need to create a new instance of this plugin using the init static function
 *
 * ```ts
 * new UPSBrazilPlugin.init({...});
 * ```
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    config.shippingOptions.shippingCalculators?.push(
      createShippingCalculator(UPSBrazilPlugin.options)
    );
    config.shippingOptions.customFulfillmentProcess?.push(
      createCustomFulfillmentProcess(UPSBrazilPlugin.options)
    );
    return config;
  }
})
export class UPSBrazilPlugin {
  private static options: UPSBrazilPluginOptions;

  static init(options: UPSBrazilPluginOptions): typeof UPSBrazilPlugin {
    UPSBrazilPlugin.options = options;
    return this;
  }
}
