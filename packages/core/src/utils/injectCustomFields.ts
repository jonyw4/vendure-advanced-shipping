import { RuntimeVendureConfig, CustomFields } from '@vendure/core';

/**
 * Inject custom fields in a Vendure Runtime Configure.
 */
export default function injectCustomFields(
  config: RuntimeVendureConfig,
  customFields: CustomFields
) {
  const response: RuntimeVendureConfig = { ...config };

  (Object.keys(customFields) as Array<keyof typeof customFields>).map((key) => {
    const fields = customFields[key];
    if (!fields) {
      return;
    }
    fields.map((field) => {
      response.customFields[key].push(field);
    });
  });

  return response;
}
