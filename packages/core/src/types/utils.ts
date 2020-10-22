import { CurrencyCode } from '@vendure/core';

export type Unarray<T> = T extends (infer U)[] ? U : T;
export interface ShippingCalculatorDefaultMetadata {
  /**
   * How many days to deliver this shipping
   */
  daysToDelivery: number;
  /**
   * The name of the carrier
   */
  carrier: string;
  /**
   * The method of the carrier
   */
  method: string;
  /**
   * The currency of the price
   */
  currency: CurrencyCode;
}
