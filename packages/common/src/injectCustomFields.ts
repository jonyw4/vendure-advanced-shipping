import { RuntimeVendureConfig, CustomFieldConfig } from '@vendure/core';
export default function injectCustomFields(
  config: RuntimeVendureConfig,
  customFields: { [key: string]: CustomFieldConfig[] }
) {
  Object.keys(customFields).map((key) => {
    const fields = customFields[key];

    fields.map((field) => {
      // @ts-ignore
      config.customFields[key].push(field);
    });
  });

  return config;
}
