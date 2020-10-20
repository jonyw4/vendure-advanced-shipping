import {
  examplePaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig
} from '@vendure/core';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AdvancedShippingCorePlugin } from '@vendure-advanced-shipping/core';
import { RodonavesPlugin } from '@vendure-advanced-shipping/rodonaves';
import { MelhorEnvioPlugin } from '@vendure-advanced-shipping/melhor-envio';
import { UPSBrazilPlugin } from '@vendure-advanced-shipping/ups-brazil';
import { PickupInStorePlugin } from '@vendure-advanced-shipping/pickup-in-store';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import path from 'path';

const PORT = Number(process.env.PORT) || 3000;

export const config: VendureConfig = {
  shippingOptions: {
    shippingCalculators: []
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
    type: 'postgres',
    synchronize: true,
    logging: false,
    database: 'vendure',
    host: 'host.docker.internal',
    port: 5432,
    username: 'postgres',
    password: 'password'
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
    AdvancedShippingCorePlugin,
    PickupInStorePlugin,
    RodonavesPlugin,
    MelhorEnvioPlugin,
    UPSBrazilPlugin,
    AdminUiPlugin.init({
      port: 3002,
      app: compileUiExtensions({
        outputPath: path.join(__dirname, 'admin-ui'),
        extensions: [AdvancedShippingCorePlugin.uiExtensions],
        devMode: true
      })
    })
  ]
};

export default config;
