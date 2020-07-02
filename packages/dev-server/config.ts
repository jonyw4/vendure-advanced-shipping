import {
  examplePaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig
} from '@vendure/core';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AdvancedShippingCorePlugin } from '@vendure-advanced-shipping/core';
import { RodonavesShippingCalculator } from '@vendure-advanced-shipping/rodonaves';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import path from 'path';

const PORT = Number(process.env.PORT) || 3000;

export const config: VendureConfig = {
  shippingOptions: {
    shippingCalculators: [RodonavesShippingCalculator]
  },
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
    type: 'mysql',
    synchronize: true,
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false
  },
  paymentOptions: {
    paymentMethodHandlers: [examplePaymentHandler]
  },
  plugins: [
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, 'static/assets'),
      port: 3001
    }),
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    AdminUiPlugin.init({
      port: 3002,
      app: compileUiExtensions({
        outputPath: path.join(__dirname, 'admin-ui'),
        extensions: [AdvancedShippingCorePlugin.uiExtensions],
        devMode: true
      })
    }),
    AdvancedShippingCorePlugin
  ]
};

export default config;
