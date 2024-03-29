import { ShippingCalculator, LanguageCode } from '@vendure/core';
import {
  convertNumberForVdr,
  ShippingCalculatorDefaultMetadata
} from '@vendure-advanced-shipping/core';

export const PickupInStoreShippingCalculator = new ShippingCalculator({
  code: 'pickup-in-store',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'Pick up in store'
    },
    {
      languageCode: LanguageCode.pt_BR,
      value: 'Retirar na loja'
    }
  ],
  args: {
    storeName: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Store Name'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Nome da Loja'
        }
      ]
    },
    streetLine1: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Street Line 1'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Linha de Endereço 1'
        }
      ]
    },
    streetLine2: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Street Line 2'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Linha de Endereço 2'
        }
      ]
    },
    city: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'City'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Cidade'
        }
      ]
    },
    province: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Province'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Estado'
        }
      ]
    },
    provinceCode: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Province Code'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'UF'
        }
      ]
    },
    zipCode: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Zip Code'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'CEP'
        }
      ]
    },
    country: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Country'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'País'
        }
      ]
    },
    phoneNumber: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Phone Number'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Telefone'
        }
      ]
    },
    openingHours: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Opening Hours'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Horário de atendimento'
        }
      ]
    },
    postalCodeRangeStart: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Postal Code Range (From)'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Alcance de CEP (Inicio)'
        }
      ]
    },
    postalCodeRangeEnd: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Postal Code Range (To)'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Alcance de CEP (Fim)'
        }
      ]
    },
    lat: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Latitude'
        }
      ]
    },
    lng: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Longitude'
        }
      ]
    },
    adjustment: {
      type: 'int',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Adjustment Value'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Valor de Ajuste do Frete'
        }
      ]
    },
    daysToDelivery: {
      type: 'int',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Days to prepare the order'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Dias para preparação da entrega'
        }
      ]
    }
  },
  calculate: (
    ctx,
    order,
    { adjustment, postalCodeRangeStart, postalCodeRangeEnd, ...otherArgs }
  ) => {
    function sanitizePostalCode(postalCode: string) {
      return parseInt(postalCode.replace(/\D+/g, ''));
    }

    if (!order.shippingAddress.postalCode) {
      return undefined;
    }

    const customerPostalCode = sanitizePostalCode(
      order.shippingAddress.postalCode
    );

    if (
      customerPostalCode >= sanitizePostalCode(postalCodeRangeStart) &&
      customerPostalCode <= sanitizePostalCode(postalCodeRangeEnd)
    ) {
      const metadata: ShippingCalculatorDefaultMetadata = {
        carrier: 'pickup-in-store',
        method: 'default',
        ...otherArgs
      };
      const price = convertNumberForVdr(adjustment);
      return {
        price: price,
        priceWithTax: price,
        metadata
      };
    } else {
      return undefined;
    }
  }
});
