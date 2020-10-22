import { CustomFulfillmentProcess, FulfillmentState } from '@vendure/core';
import { checkFulfillmentTransitionForCreatingLabel } from '@vendure-advanced-shipping/core';
import UPS from 'ups-js';
import { SHIPPING_CALCULATOR_CODE } from './shipping-calculator';
import { UPSBrazilPluginOptions } from './types';

export function createCustomFulfillmentProcess({
  label
}: UPSBrazilPluginOptions): CustomFulfillmentProcess<FulfillmentState> {
  const ups = new UPS(
    label.username,
    label.password,
    label.licenseNumber,
    label.isSandbox,
    label.timeout
  );

  return {
    init: async (injector) => {
      if (typeof label.init === 'function') {
        await label.init(injector);
      }
    },
    destroy: async () => {
      if (typeof label.destroy === 'function') {
        await label.destroy();
      }
    },
    onTransitionStart: async (fromState, toState, data) => {
      const { orders } = data;
      if (
        checkFulfillmentTransitionForCreatingLabel(
          fromState,
          toState,
          SHIPPING_CALCULATOR_CODE,
          orders[0]
        )
      ) {
        const response = await ups.createShipment({
          ShipmentRequest: await label.map(data)
        });

        return await label.save(data, response);
      }
    }
  };
}
