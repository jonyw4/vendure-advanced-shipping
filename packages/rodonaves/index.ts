import { ShippingCalculator, LanguageCode } from '@vendure/core';
import convertUnit from '@vendure-advanced-shipping/common/lib/convertUnit';
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
    const { packages: shippingPackages } = await shippingPackagesService.create(
      order
    );
    const rodonaves = new Rodonaves(username, password, 'prod', timeout);

    try {
      const { Value, DeliveryTime } = await rodonaves.simulateQuote(
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
        price: Value * 100,
        priceWithTax: Value * 100,
        metadata: {
          deliveryTime: DeliveryTime
        }
      };
    } catch (error) {
      // TODO: Handle error
      console.log(error.message);
      throw new Error(error);
    }
  }
});
