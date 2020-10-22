import {
  ShippingCalculator,
  LanguageCode,
  Logger,
  CurrencyCode
} from '@vendure/core';
import {
  ShippingPackagesService,
  convertUnits,
  convertNumberForVdr,
  ShippingCalculatorDefaultMetadata,
  convertVdrNumberToNormal
} from '@vendure-advanced-shipping/core';
import MelhorEnvio from 'menv-js';
import { MelhorEnvioPluginOptions } from './types';

export const SHIPPING_CALCULATOR_CODE = 'melhor-envio';

export function createShippingCalculator({
  timeout,
  token,
  isSandbox,
  postalCode
}: MelhorEnvioPluginOptions): ShippingCalculator {
  let shippingPackagesService: ShippingPackagesService;
  const menv = new MelhorEnvio(token, isSandbox, timeout);

  return new ShippingCalculator({
    code: SHIPPING_CALCULATOR_CODE,
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
    calculate: async (order, { service, receipt, ownHand }) => {
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
        const response = await menv.calculateShipment({
          fromPostalCode: postalCode,
          toPostalCode: customerPostalCode,
          productsOrPackageData: {
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
          services: service,
          receipt,
          ownHand,
          insuranceValue: convertVdrNumberToNormal(order.subTotal)
        });
        // @ts-ignore
        if (response.error) {
          // @ts-ignore
          Logger.error(response.error);
          return undefined;
        }
        const price = convertNumberForVdr(response.price);
        const metadata: ShippingCalculatorDefaultMetadata = {
          daysToDelivery: Number(response.delivery_time),
          carrier: `melhor-envio-${response.company.name}`,
          method: service,
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
