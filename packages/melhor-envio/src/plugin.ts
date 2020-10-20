import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { MelhorEnvioShippingCalculator } from './shipping-calculator';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    config.shippingOptions.shippingCalculators?.push(
      MelhorEnvioShippingCalculator
    );
    return config;
  }
})
export class MelhorEnvioPlugin {}
