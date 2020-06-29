import {
  examplePaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig
} from '@vendure/core';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AdvancedShippingCorePlugin } from '@vendure-advanced-shipping/core';
import path from 'path';

const PORT = Number(process.env.PORT) || 3000;

export const config: VendureConfig = {
  apiOptions: {
    hostname: '0.0.0.0',
    port: PORT,
    adminApiPath: 'admin-api',
    adminApiPlayground: {
      settings: {
        'request.credentials': 'include'
      } as any
    },
    adminApiDebug: true,
    shopApiPath: 'shop-api',
    shopApiPlayground: {
      settings: {
        'request.credentials': 'include'
      } as any
    },
    shopApiDebug: true
  },
  authOptions: {
    tokenMethod: 'cookie',
    sessionSecret: 'plruo0esah',
    requireVerification: true
  },
  dbConnectionOptions: {
    synchronize: false,
    type: 'sqlite',
    database: path.join(__dirname, 'vendure.sqlite')
  },
  paymentOptions: {
    paymentMethodHandlers: [examplePaymentHandler]
  },
  plugins: [
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      port: 3001
    }),
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    AdminUiPlugin.init({ port: 3002 }),
    AdvancedShippingCorePlugin
  ]
};

export default config;
