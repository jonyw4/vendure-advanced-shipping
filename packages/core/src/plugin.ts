import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import injectCustomFields from '@vendure-advanced-shipping/common/src/injectCustomFields';
import { PackageEntity, ShippingPackagesEntity } from './entities';
import { PackageService, ShippingPackagesService } from './services';
import { PackageResolver } from './resolvers';
import { adminApiExtensions } from './api';
import customFields from './config/customFields';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    return injectCustomFields(config, customFields);
  },
  entities: [ShippingPackagesEntity, PackageEntity],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [PackageResolver]
  },
  providers: [PackageService, ShippingPackagesService]
})
export class AdvancedShippingCorePlugin {
  static uiExtensions: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'shared',
        ngModuleFileName: 'shared-module.ts',
        ngModuleName: 'AdvancedShippingCoreUiSharedModule'
      },
      {
        type: 'lazy',
        route: 'packages',
        ngModuleFileName: 'module.ts',
        ngModuleName: 'AdvancedShippingCoreUiModule'
      }
    ],
    translations: {
      en: path.join(__dirname, 'i18n/en.json')
    }
  };
}
