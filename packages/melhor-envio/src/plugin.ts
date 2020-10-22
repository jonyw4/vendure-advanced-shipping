import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { createShippingCalculator } from './shipping-calculator';
import { MelhorEnvioPluginOptions } from './types';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    config.shippingOptions.shippingCalculators?.push(
      createShippingCalculator(MelhorEnvioPlugin.options)
    );
    return config;
  }
})
export class MelhorEnvioPlugin {
  private static options: MelhorEnvioPluginOptions;
  static init(options: MelhorEnvioPluginOptions): typeof MelhorEnvioPlugin {
    MelhorEnvioPlugin.options = options;
    return this;
  }
}
