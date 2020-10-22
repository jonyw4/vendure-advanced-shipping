import { Request } from 'menv-js';
import { FulfillmentTransitionData, InjectableStrategy } from '@vendure/core';

export interface MelhorEnvioPluginOptions extends InjectableStrategy {
  isSandbox: boolean;
  token: string;
  postalCode: string;
  timeout: number;
  // createLabelMap<T, S, NC>(
  //   data: FulfillmentTransitionData
  // ): T & Request.Cart<S, NC>;
}
