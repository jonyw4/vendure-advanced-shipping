import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import injectCustomFields from '@vendure-advanced-shipping/common/lib/injectCustomFields';
import { PackageEntity } from './entities';
import { PackageService } from './services';
import { PackageResolver } from './resolvers';
import { adminApiExtensions } from './api';
import customFields from './config/customFields';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    return injectCustomFields(config, customFields);
  },
  entities: [PackageEntity],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [PackageResolver]
  },
  providers: [PackageService]
})
export class AdvancedShippingCorePlugin {}
