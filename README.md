# Vendure Advanced Shipping
![Publish](https://github.com/jonyw4/vendure-advanced-shipping/workflows/Publish/badge.svg?branch=master)
![Build & Test](https://github.com/jonyw4/vendure-advanced-shipping/workflows/Build%20&%20Test/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Crowdin](https://badges.crowdin.net/vendure-advanced-shipping/localized.svg)](https://crowdin.com/project/vendure-advanced-shipping)

📦 A series of plugins for [Vendure](https://github.com/vendure-ecommerce/vendure) to add features to shipping using boxes and shipping based on product dimensions.

## 🌟 Features
- CRUD of packages/boxes. (Both admin UI / GQL)
- Ability to add dimensions in Product (Using [Custom Fields](https://www.vendure.io/docs/typescript-api/custom-fields/))
- A table in the database to register all packages of an order.
- A `ShippingPackages` service helper to calculate which box to use in Order and update the order in the database


## ⚙️ Install
### 1. Install and configure Vendure
[Here](https://www.vendure.io/docs/getting-started/) you can find out how to install

### 2. Install the core package
```bash
npm install @vendure-advanced-shipping/core --save
```

### 2.1 Install the optional packages or create one. (Optional)
You can find the list of available packages compatible with this repo in the list PACKAGES above.

### 3. Add all plugins in Vendure configuration
```typescript
import { AdvancedShippingCorePlugin } from '@vendure-advanced-shipping/core';
const config: VendureConfig = {
  ...
  plugins: [
    AdvancedShippingCorePlugin
  ]
}
```

### 4. Extend the UI plugin (optional)
You need to extend the UI adding the `uiExtensions` in the `compileUiExtensions` of the `AdminUiPlugin`.  You can read more about [how to config here](https://www.vendure.io/docs/plugins/extending-the-admin-ui/)
```typescript
import { AdvancedShippingCorePlugin } from '@vendure-advanced-shipping/core';
const config: VendureConfig = {
  ...
  plugins: [
    ...
    AdminUiPlugin.init({
      ...
      app: compileUiExtensions({
        ...
        extensions: [AdvancedShippingCorePlugin.uiExtensions],
      })
    })
  ]
}

```

### 5. Enjoy!
It's done!

## 📚 How to use?
### 1. Create your first package box
![Step 1.1](/docs/tutorial-1.jpg)
![Step 1.2](/docs/tutorial-2.jpg)
![Step 1.3](/docs/tutorial-3.png)
### 2. Configure your products dimensions
![Step 2](/docs/tutorial-4.png)
### 3. Configure your shipping products
![Step 2](/docs/tutorial-5.png)
### 4. Done, enjoy!

## 📖 Packages
### [![npm (scoped)](https://img.shields.io/npm/v/@vendure-advanced-shipping/core.svg)](https://www.npmjs.com/package/@vendure-advanced-shipping/core) @vendure-advanced-shipping/core
This package contains the core features of Advanced Shipping.

### [![npm (scoped)](https://img.shields.io/npm/v/@vendure-advanced-shipping/melhor-envio.svg)](https://www.npmjs.com/package/@vendure-advanced-shipping/melhor-envio) @vendure-advanced-shipping/melhor-envio
A plugin using the Advanced Shipping for calculate shipping using [Melhor Envio](https://melhorenvio.com.br/) as provider

### [![npm (scoped)](https://img.shields.io/npm/v/@vendure-advanced-shipping/rodonaves.svg)](https://www.npmjs.com/package/@vendure-advanced-shipping/rodonaves) @vendure-advanced-shipping/rodonaves
A plugin using the Advanced Shipping for calculate shipping using [Rodonaves](http://www.rte.com.br/) as provider

### [![npm (scoped)](https://img.shields.io/npm/v/@vendure-advanced-shipping/ups-brazil.svg)](https://www.npmjs.com/package/@vendure-advanced-shipping/ups-brazil) @vendure-advanced-shipping/ups-brazil
A plugin using the Advanced Shipping for calculate shipping using [UPS Brazil](https://www.ups.com/br/pt/Home.page) as provider

### [![npm (scoped)](https://img.shields.io/npm/v/@vendure-advanced-shipping/pickup-in-store.svg)](https://www.npmjs.com/package/@vendure-advanced-shipping/pickup-in-store) @vendure-advanced-shipping/pickup-in-store
A plugin to pickup order in store.

- A `ShippingCalculator` to create multiple stores to customer pickup the order based on Postal Code.
- A `PickupInStoreCronService` that adds a cronjob that checks every day at  mid night orders that its in the state of `Packed` in the interval of 7 days and that the shipping method its `pickup-in-store` (the same from the `ShippingCalculator`) after get, the service will cancel all of then.
- A `PickupInStoreCancelOrder` event that fired whenever an Order is cancelled by  Cron Job

## 👨🏻‍💻 Creating a shipping calculator / plugin
It's really easy to [create a `ShippingCalculator` in Vendure](https://www.vendure.io/docs/typescript-api/shipping/shipping-calculator/) and this project takes advantage of it. You just need to create a new `ShippingCalculator` class that will inject in his init function, your `ShippingPackagesService` so that you can get which packages boxes to use in this order. You can get [here an example to how to do it](https://github.com/jonyw4/vendure-advanced-shipping/blob/master/packages/rodonaves/index.ts).


## 🏢 Structure
This project is a monorepo managed with [Lerna](https://github.com/lerna/lerna). Several npm packages are published from this repo, which can be found in the `packages/` directory.


## ✅ Testing
#### Server Unit Tests

The core and several other packages have unit tests which are can be run all together by running `npm test` from the root directory, or individually by running it from the package directory.

Unit tests are co-located with the files which they test, and have the suffix `.spec.ts`.

#### End-to-end Tests

Certain packages have e2e tests, which are located at `/packages/<name>/e2e/`. All e2e tests can be run by running `yarn e2e` from the root directory, or individually by running it from the package directory.

e2e tests use the `@vendure/testing` package. For details of how the setup works, see the [Testing docs](https://www.vendure.io/docs/developer-guide/testing/)

## 🌐 Localization
This project localization its hosted in [Crowdin](https://crowdin.com/project/vendure-advanced-shipping).

## ❗️ License
MIT 