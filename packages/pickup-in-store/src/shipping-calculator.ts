import { ShippingCalculator, LanguageCode } from '@vendure/core';

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
    address: {
      type: 'string',
      label: [
        {
          languageCode: LanguageCode.en,
          value: 'Address'
        },
        {
          languageCode: LanguageCode.pt_BR,
          value: 'Endereço'
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
    preparationDays: {
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
  // @ts-ignore
  calculate: (
    order,
    {
      address,
      adjustment,
      preparationDays,
      openingHours,
      postalCodeRangeStart,
      postalCodeRangeEnd
    }
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
    )
      return {
        price: adjustment,
        priceWithTax: adjustment,
        metadata: {
          carrier: 'pickup-in-store',
          service: 'default',
          deliveryTime: preparationDays,
          address: address,
          openingHours: openingHours
        }
      };
    else {
      return undefined;
    }
  }
});
