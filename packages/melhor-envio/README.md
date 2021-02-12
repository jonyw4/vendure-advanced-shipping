### @vendure-advanced-shipping/melhor-envio
A plugin using the Advanced Shipping for calculate shipping using [Melhor Envio](https://melhorenvio.com.br/) as provider

## ⚙️ Install
### 1. Install and configure Core
[Here](https://github.com/miniverso/vendure-advanced-shipping) you can find out how to install

### 2. Install the MelhorEntrega package
```bash
npm install @vendure-advanced-shipping/melhorentrega --save
```

### 3. Add MelhorEnvio Pluggin in Vendure configuration
```typescript
import { MelhorEnvioPlugin } from "@vendure-advanced-shipping/melhor-envio";
const config: VendureConfig = {
  ...
  plugins: [
    MelhorEnvioPlugin.init({
      postalCode: string,
      isSandbox: boolean,
      token: string,
      timeout: number,
    })
  ]
}
```
To generate your own token, access [here](https://melhorenvio.com.br/painel/gerenciar/tokens). 