import { ShippingCalculator, LanguageCode } from '@vendure/core';
import convertUnit from '@vendure-advanced-shipping/common/lib/convertUnit';
import { ShippingPackagesService } from '@vendure-advanced-shipping/core';
// @ts-ignore
import ups from 'ups-brazil-js';

let shippingPackagesService: ShippingPackagesService;
export const UPSBrazilShippingCalculator = new ShippingCalculator({
  code: 'ups-brazil',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'UPS Brasil Shipping Calculator'
    },
    {
      languageCode: LanguageCode.pt_BR,
      value: 'Calculadora da UPS Brasil'
    }
  ],
  args: {
    username: { type: 'string' },
    password: { type: 'string' },
    timeout: { type: 'int', value: 10000 },
    postalCode: { type: 'string' }
  },
  init: (injector) => {
    shippingPackagesService = injector.get(ShippingPackagesService);
  },
  calculate: async (order, { username, password, timeout, postalCode }) => {
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

    try {
      const { FreteTotalReceber, ValorEA } = await ups(
        username,
        password,
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
        order.subTotal / 100,
        timeout
      );
      return {
        price: FreteTotalReceber * 100,
        priceWithTax: FreteTotalReceber * 100,
        metadata: {
          deliveryTime: ValorEA > 0 ? 5 : 2
        }
      };
    } catch (error) {
      // TODO: Handle error
      console.log(error.message);
      throw new Error(error);
    }
  }
});
