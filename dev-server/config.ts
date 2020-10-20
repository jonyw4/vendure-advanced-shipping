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
import { MelhorEnvioShippingCalculator } from '@vendure-advanced-shipping/melhor-envio';
import { UPSBrazilShippingCalculator } from '@vendure-advanced-shipping/ups-brazil';
import { PickupInStorePlugin } from '@vendure-advanced-shipping/pickup-in-store';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import path from 'path';

const PORT = Number(process.env.PORT) || 3000;

export const config: VendureConfig = {
  shippingOptions: {
    shippingCalculators: [
      MelhorEnvioShippingCalculator,
      RodonavesShippingCalculator,
      UPSBrazilShippingCalculator
    ]
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
    host: 'host.docker.internal',
    port: 3306,
    username: 'root',
    password: '',
    database: 'vendure',
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
    AdvancedShippingCorePlugin,
    PickupInStorePlugin,
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
