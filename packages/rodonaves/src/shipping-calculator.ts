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
import Rodonaves from 'rodonaves-js';
import { RodonavesPluginOptions } from './types';

export const SHIPPING_CALCULATOR_CODE = 'rodonaves';

export function createShippingCalculator({
  username,
  password,
  timeout,
  postalCode,
  taxId
}: RodonavesPluginOptions): ShippingCalculator {
  let shippingPackagesService: ShippingPackagesService;
  return new ShippingCalculator({
    code: SHIPPING_CALCULATOR_CODE,
    description: [
      {
        languageCode: LanguageCode.en,
        value: 'Rodonaves Shipping Calculator'
      },
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Calculadora da Rodonaves'
      }
    ],
    args: {},
    init: (injector) => {
      shippingPackagesService = injector.get(ShippingPackagesService);
    },
    calculate: async (order) => {
      const customerPostalCode = order.shippingAddress.postalCode;

      if (!customerPostalCode) {
        return undefined;
      }

      const {
        packages: shippingPackages
      } = await shippingPackagesService.create(order);
      if (!shippingPackages || shippingPackages.length === 0) {
        return undefined;
      }
      const rodonaves = new Rodonaves(username, password, 'prod', timeout);

      try {
        const { Value, DeliveryTime } = await rodonaves.simulateQuote(
          postalCode,
          customerPostalCode,
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
        const price = Number(Value) * 100;
        return {
          price: price,
          priceWithTax: price,
          metadata: {
            deliveryTime: DeliveryTime,
            carrier: 'rodonaves',
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
