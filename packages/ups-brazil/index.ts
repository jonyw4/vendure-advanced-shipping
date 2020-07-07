import {
  ShippingCalculator,
  LanguageCode,
  Logger,
  UserInputError
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
      throw new UserInputError(
        'vdr-advanced-shipping-plugin.empty-postal-code'
      );
    }

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
