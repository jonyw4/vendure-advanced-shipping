import { ShippingCalculator, LanguageCode } from '@vendure/core';
import convertUnit from '@vendure-advanced-shipping/common/lib/convertUnit';
import { ShippingPackagesService } from '@vendure-advanced-shipping/core';
// @ts-ignore
import MelhorEnvio from 'menv-js';

let shippingPackagesService: ShippingPackagesService;
export const MelhorEnvioShippingCalculator = new ShippingCalculator({
  code: 'melhor-envio',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'Melhor Envio Shipping Calculator'
    },
    {
      languageCode: LanguageCode.pt_BR,
      value: 'Calculadora da Melhor Envio'
    }
  ],
  args: {
    isSandbox: { type: 'boolean', value: false },
    token: { type: 'string', value: 10000 },
    postalCode: { type: 'string' },
    timeout: { type: 'int', value: 10000 },
    service: { type: 'string', value: '1' },
    receipt: { type: 'boolean', value: true },
    ownHand: { type: 'boolean', value: true }
  },
  init: (injector) => {
    shippingPackagesService = injector.get(ShippingPackagesService);
  },
  calculate: async (
    order,
    { timeout, token, isSandbox, postalCode, service, receipt, ownHand }
  ) => {
    const { packages: shippingPackages } = await shippingPackagesService.create(
      order
    );
    // Returns empty when have more than one package
    if (shippingPackages.length > 1) {
      // TODO: Handle error
      console.log('More than one package');
      throw new Error();
    }
    const packageData = shippingPackages[0];

    const melhorEnvio = new MelhorEnvio(token, isSandbox, timeout);
    try {
      const { items } = melhorEnvio.calculateShipment(
        postalCode,
        order.shippingAddress.postalCode,
        {
          weight: convertUnit(packageData.totalWeight)
            .from(packageData.massUnit)
            .to('kg'),
          length: convertUnit(packageData.length)
            .from(packageData.distanceUnit)
            .to('cm'),
          height: convertUnit(packageData.height)
            .from(packageData.distanceUnit)
            .to('cm'),
          width: convertUnit(packageData.width)
            .from(packageData.distanceUnit)
            .to('cm')
        },
        [],
        [service],
        receipt,
        ownHand,
        order.subTotal / 100
      );
      const { price, delivery_time: deliveryTime } = items[0];
      return {
        price: price * 100,
        priceWithTax: price * 100,
        metadata: {
          deliveryTime: deliveryTime
        }
      };
    } catch (error) {
      // TODO: Handle error
      console.log(error.message);
      throw new Error(error);
    }
  }
});
