import {
  ShippingCalculator,
  LanguageCode,
  Logger,
  CurrencyCode
} from '@vendure/core';
import {
  ShippingPackagesService,
  convertUnits,
  ShippingCalculatorDefaultMetadata,
  convertNumberForVdr,
  convertVdrNumberToNormal
} from '@vendure-advanced-shipping/core';
import ups from 'ups-brazil-js';
import { UPSBrazilPluginOptions } from './types';

export const SHIPPING_CALCULATOR_CODE = 'ups-brazil';

export const DAYS_TO_NORMAL_DELIVERY = 2;
export const DAYS_TO_EXTENDED_DELIVERY = 5;

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
    calculate: async (ctx, order) => {
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
            weight: convertUnits(packageData.totalWeight)
              .from(packageData.massUnit)
              .to('kg'),
            length: convertUnits(packageData.length)
              .from(packageData.distanceUnit)
              .to('cm'),
            height: convertUnits(packageData.height)
              .from(packageData.distanceUnit)
              .to('cm'),
            width: convertUnits(packageData.width)
              .from(packageData.distanceUnit)
              .to('cm')
          },
          convertVdrNumberToNormal(order.subTotal),
          timeout
        );
        const price = convertNumberForVdr(FreteTotalReceber);
        const metadata: ShippingCalculatorDefaultMetadata = {
          carrier: 'ups',
          method: 'default',
          daysToDelivery:
            ValorEA > 0 ? DAYS_TO_EXTENDED_DELIVERY : DAYS_TO_NORMAL_DELIVERY,
          currency: CurrencyCode.BRL
        };

        return {
          price: price,
          priceWithTax: price,
          metadata: metadata
        };
      } catch (error) {
        Logger.error(error);
        return undefined;
      }
    }
  });
}
