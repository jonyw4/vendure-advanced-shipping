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
    }
  },
  init: (injector) => {
    shippingPackagesService = injector.get(ShippingPackagesService);
  },
  calculate: async (order, { username, password, timeout, postalCode }) => {
    const customerPostalCode = order.shippingAddress.postalCode;

    if (!customerPostalCode) {
      return undefined;
    }

    const { packages: shippingPackages } = await shippingPackagesService.create(
      order
    );

    // Returns empty when have more than one package
    if (shippingPackages.length > 1) {
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
