import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { UPSBrazilShippingCalculator } from './shipping-calculator';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    config.shippingOptions.shippingCalculators?.push(
      UPSBrazilShippingCalculator
    );
    return config;
  }
})
export class UPSBrazilPlugin {}
