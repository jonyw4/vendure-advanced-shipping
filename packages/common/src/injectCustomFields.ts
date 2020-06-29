import {
  RuntimeVendureConfig,
  CustomFields,
  CustomFieldConfig
} from '@vendure/core';

/**
 * Inject custom fileds in a Vendure Runtime Configure.
 */
export default function injectCustomFields(
  config: RuntimeVendureConfig,
  customFields: CustomFields
) {
  Object.keys(customFields).map((key) => {
    // @ts-ignore
    const fields: CustomFieldConfig[] = customFields[key];

    fields.map((field) => {
      // @ts-ignore
      config.customFields[key].push(field);
    });
  });

  return config;
}
