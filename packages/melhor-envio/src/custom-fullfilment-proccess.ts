import { CustomFulfillmentProcess, FulfillmentState } from '@vendure/core';
import {
  checkFulfillmentTransitionForCreatingLabel,
  checkIfFulfillmentByShippingCalculator
} from '@vendure-advanced-shipping/core';
import MelhorEnvio from 'menv-js';
import { SHIPPING_CALCULATOR_CODE } from './shipping-calculator';
import { MelhorEnvioPluginOptions } from './types';

export function createCustomFulfillmentProcess(
  options: MelhorEnvioPluginOptions
): CustomFulfillmentProcess<FulfillmentState | 'Created'> {
  const menv = new MelhorEnvio(
    options.token,
    options.isSandbox,
    options.timeout
  );

  return {
    init: async (injector) => {
      if (typeof options.init === 'function') {
        await options.init(injector);
      }
    },
    destroy: async () => {
      if (typeof options.destroy === 'function') {
        await options.destroy();
      }
    },
    onTransitionStart: async (fromState, toState, data) => {
      const { orders } = data;
      const order = orders[0];
      if (
        fromState === 'Created' &&
        toState === 'Shipped' &&
        checkIfFulfillmentByShippingCalculator(order, SHIPPING_CALCULATOR_CODE)
      ) {
        // const { id: orderId } = await menv.addItemInCart(
        //   options.createLabelMap(data)
        // );
        // await menv.checkout({ orders: [orderId] });
        // await menv.generateLabel({ orders: [orderId] });
        // TODO: Salvar ID da compra em um custom field
      } else if (
        checkFulfillmentTransitionForCreatingLabel(
          fromState as FulfillmentState,
          toState as FulfillmentState,
          SHIPPING_CALCULATOR_CODE,
          order
        )
      ) {
        // TODO: Pegar ID da compra
        // const orderId = '10';
        // await menv.printLabel({ orders: [orderId], mode: 'public' });
        // Salvar URL da etiqueta em um custom field
      }
    }
  };
}
