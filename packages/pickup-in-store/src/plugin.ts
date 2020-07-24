import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { ScheduleModule } from '@nestjs/schedule';
import { PickupInStoreCronService } from './cron-service';
import { PickupInStoreShippingCalculator } from './shipping-calculator';

@VendurePlugin({
  imports: [PluginCommonModule, ScheduleModule.forRoot()],
  providers: [PickupInStoreCronService],
  configuration: (config) => {
    config.shippingOptions.shippingCalculators?.push(
      PickupInStoreShippingCalculator
    );
    return config;
  }
})
export class PickupInStorePlugin {}
