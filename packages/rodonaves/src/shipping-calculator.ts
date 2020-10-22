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
  convertVdrNumberToNormal,
  convertNumberForVdr
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
          })),
          convertVdrNumberToNormal(order.subTotal),
          taxId
        );
        const price = convertNumberForVdr(Value);
        const metadata: ShippingCalculatorDefaultMetadata = {
          daysToDelivery: DeliveryTime,
          carrier: 'rodonaves',
          method: 'default',
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
