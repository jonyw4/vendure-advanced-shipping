import { ShippingCalculator, LanguageCode } from '@vendure/core';
import convertUnit from '@vendure-advanced-shipping/common/src/convertUnit';
import { ShippingPackagesService } from '@vendure-advanced-shipping/core';
// @ts-ignore
import Rodonaves from 'rodonaves-js';

let shippingPackagesService: ShippingPackagesService;
export const RodonavesShippingCalculator = new ShippingCalculator({
  code: 'rodonaves',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'Rodonaves Shipping Calculator'
    },
    {
      languageCode: LanguageCode.en,
      value: 'Calculadora da Rodonaves'
    }
  ],
  args: {
    // TODO: Customize fields
    username: { type: 'string' },
    password: { type: 'string' },
    timeout: { type: 'int' },
    postalCode: { type: 'string' },
    taxId: { type: 'string' }
  },
  init: (injector) => {
    shippingPackagesService = injector.get(ShippingPackagesService);
  },
  calculate: async (
    order,
    { username, password, timeout, postalCode, taxId }
  ) => {
    const { packages: shippingPackages } = await shippingPackagesService.create(
      order
    );
    const rodonaves = new Rodonaves(username, password, 'prod', timeout);

    try {
      const response = await rodonaves.simulateQuote(
        postalCode,
        order.shippingAddress.postalCode,
        shippingPackages.map((packageData) => ({
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
        })),
        order.subTotal / 100,
        taxId
      );
      return {
        price: response.Value * 100,
        priceWithTax: response.Value * 100,
        metadata: {
          deliveryTime: response.DeliveryTime
        }
      };
    } catch (error) {
      // TODO: Handle error
      console.log(error.message);
      throw new Error(error);
    }
  }
});
