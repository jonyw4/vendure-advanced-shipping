import {
  ShippingCalculator,
  LanguageCode,
  Logger,
  CurrencyCode
} from '@vendure/core';
import {
  ShippingPackagesService,
  convertUnit
} from '@vendure-advanced-shipping/core';
import ups from 'ups-brazil-js';
import { UPSBrazilPluginOptions } from './types';

export const SHIPPING_CALCULATOR_CODE = 'ups-brazil';

export function createShippingCalculator({
  shippingCalculator: { username, password, timeout, postalCode }
}: UPSBrazilPluginOptions): ShippingCalculator {
  let shippingPackagesService: ShippingPackagesService;
  return new ShippingCalculator({
    code: SHIPPING_CALCULATOR_CODE,
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
    args: {},
    init: (injector) => {
      shippingPackagesService = injector.get(ShippingPackagesService);
    },
    // @ts-ignore
    calculate: async (order) => {
      const customerPostalCode = order.shippingAddress.postalCode;

      if (!customerPostalCode) {
        return undefined;
      }

      const {
        packages: shippingPackages
      } = await shippingPackagesService.create(order);
      // Returns empty when have more than one package
      if (
        !shippingPackages ||
        shippingPackages.length === 0 ||
        shippingPackages.length > 1
      ) {
        return undefined;
      }

      const packageData = shippingPackages[0];

      try {
        const { FreteTotalReceber, ValorEA } = await ups(
          username,
          password,
          postalCode,
          customerPostalCode,
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
        const price = Number(FreteTotalReceber) * 100;
        return {
          price: price,
          priceWithTax: price,
          metadata: {
            deliveryTime: ValorEA > 0 ? 5 : 2,
            carrier: 'ups',
            service: 'default',
            currency: CurrencyCode.BRL
          }
        };
      } catch (error) {
        Logger.error(error);
        return undefined;
      }
    }
  });
}
