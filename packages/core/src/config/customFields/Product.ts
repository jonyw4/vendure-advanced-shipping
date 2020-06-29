import { LanguageCode, CustomFields } from '@vendure/core';

const ProductCustomFields: CustomFields['Product'] = [
  {
    name: 'weight',
    type: 'float',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Weight'
      },
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Peso'
      }
    ]
  },
  {
    name: 'length',
    type: 'float',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Length'
      },
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Comprimento'
      }
    ]
  },
  {
    name: 'height',
    type: 'float',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Height'
      },
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Altura'
      }
    ]
  },
  {
    name: 'width',
    type: 'float',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Width'
      },
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Largura'
      }
    ]
  },
  {
    name: 'massUnit',
    type: 'string',
    options: [{ value: 'g' }, { value: 'kg' }, { value: 'lb' }, { value: 'oz' }]
  },
  {
    name: 'distanceUnit',
    type: 'string',
    options: [{ value: 'cm' }, { value: 'ft' }, { value: 'in' }]
  }
];

export default ProductCustomFields;
