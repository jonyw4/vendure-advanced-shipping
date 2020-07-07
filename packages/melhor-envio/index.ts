import { ShippingCalculator, LanguageCode } from '@vendure/core';
import {
  ShippingPackagesService,
  convertUnit
} from '@vendure-advanced-shipping/core';
import MelhorEnvio from 'menv-js';

let shippingPackagesService: ShippingPackagesService;
export const MelhorEnvioShippingCalculator = new ShippingCalculator({
  code: 'melhor-envio',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'Melhor Envio Shipping Calculator'
    },
    {
      languageCode: LanguageCode.pt_BR,
      value: 'Calculadora da Melhor Envio'
    }
  ],
  args: {
    isSandbox: {
      type: 'boolean',
      value: false,
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Use sandbox mode?'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Usar em modo sandbox/teste?'
        }
      ]
    },
    token: {
      type: 'string',
      value: 10000,
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Token'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Chave Token'
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
    timeout: {
      type: 'int',
      value: 10000,
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Timeout (ms)'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Tempo máximo de resposta (ms)'
        }
      ]
    },
    service: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Service'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Serviço'
        }
      ],
      config: {
        options: [
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Correios - PAC'
              }
            ],
            value: '1'
          },
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Correios - SEDEX'
              }
            ],
            value: '2'
          },
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Correios - Mini Envios'
              }
            ],
            value: '17'
          },
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Jadlog - .Package'
              }
            ],
            value: '3'
          },
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Jadlog - .com'
              }
            ],
            value: '4'
          },
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Via Brasil - Rodoviário'
              }
            ],
            value: '9'
          },
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Azul Cargo Express - Amanhã'
              }
            ],
            value: '15'
          },
          {
            label: [
              {
                languageCode: LanguageCode.en,
                value: 'Azul Cargo Express - e-commerce'
              }
            ],
            value: '16'
          }
        ]
      }
    },
    receipt: {
      type: 'boolean',
      value: true,
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Receipt'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Receita'
        }
      ]
    },
    ownHand: {
      type: 'boolean',
      value: true,
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Own Hand Service'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Serviço de mão própria'
        }
      ]
    }
  },
  init: (injector) => {
    shippingPackagesService = injector.get(ShippingPackagesService);
  },
  calculate: async (
    order,
    { timeout, token, isSandbox, postalCode, service, receipt, ownHand }
  ) => {
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

    const melhorEnvio = new MelhorEnvio(token, isSandbox, timeout);
    try {
      const response = await melhorEnvio.calculateShipment(
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
        service,
        receipt,
        ownHand,
        order.subTotal / 100
      );
      if (response.error) {
        // TODO: Handle error
        console.log(response.error);
        throw new Error(response.error);
      }
      const price = Number(response.price) * 100;
      return {
        price: price,
        priceWithTax: price,
        metadata: {
          deliveryTime: Number(response.delivery_time)
        }
      };
    } catch (error) {
      // TODO: Handle error
      console.log(error.message);
      throw new Error(error);
    }
  }
});
