import injectCustomFields from '@vendure-advanced-shipping/common/lib/injectCustomFields';
import customFields from './config/customFields';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { PluginInitOptions } from './types';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    return injectCustomFields(config, customFields);
  }
  // entities: [ExampleEntity],
  // shopApiExtensions: {
  //   schema: shopApiExtensions,
  //   resolvers: [ExampleResolver]
  // },
  // providers: [
  //   ExampleService,
  //   // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
  //   // user-defined options into other classes, such as the {@link ExampleService}.
  //   { provide: PLUGIN_INIT_OPTIONS, useFactory: () => AdvancedShippingCorePlugin.options }
  // ]
})
export class AdvancedShippingCorePlugin {
  static options: PluginInitOptions;
  static init(options: PluginInitOptions) {
    this.options = options;
    return AdvancedShippingCorePlugin;
  }
}
