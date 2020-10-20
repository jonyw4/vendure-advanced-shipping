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

let shippingPackagesService: ShippingPackagesService;
export const RodonavesShippingCalculator = new ShippingCalculator({
  code: 'rodonaves',
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
  args: {
    username: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Username'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Usuário'
        }
      ]
    },
    password: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Password'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Senha'
        }
      ]
    },
    timeout: {
      type: 'int',
      value: 10000,
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Timeout'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Tempo de resposta (ms)'
        }
      ]
    },
    postalCode: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Postal Code'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'CEP de origem'
        }
      ]
    },
    taxId: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Tax ID (Brazilian CNPJ)'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'CNPJ'
        }
      ]
    }
  },
  init: (injector) => {
    shippingPackagesService = injector.get(ShippingPackagesService);
  },
  calculate: async (
    order,
    { username, password, timeout, postalCode, taxId }
  ) => {
    const customerPostalCode = order.shippingAddress.postalCode;

    if (!customerPostalCode) {
      return undefined;
    }

    const { packages: shippingPackages } = await shippingPackagesService.create(
      order
    );
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
