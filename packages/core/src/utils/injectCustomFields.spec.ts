import { testConfig } from '@vendure/testing';
import injectCustomFields from './injectCustomFields';
describe('injectCustomFields', () => {
  it('inject custom fields in the configure', () => {
    const customFields = {
      Product: [{ name: 'test', type: 'string' }]
    };
    // @ts-ignore
    const response = injectCustomFields(testConfig, customFields);
    expect(response.customFields.Product).toEqual([
      {
        name: 'test',
        type: 'string'
      }
    ]);
  });
});
