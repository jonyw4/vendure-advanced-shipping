import { Order } from '@vendure/core';

export function checkIfFulfillmentByShippingCalculator(
  order: Order,
  code: string
): boolean {
  return order.shippingMethodId === code;
}
