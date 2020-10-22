import { FulfillmentState, Order } from '@vendure/core';
import { checkIfFulfillmentByShippingCalculator } from './checkIfFulfillmentByShippingCalculator';

export function checkFulfillmentTransitionForCreatingLabel(
  fromState: FulfillmentState,
  toState: FulfillmentState,
  shippingCalculatorCode: string,
  order: Order
): boolean {
  return (
    fromState === 'Pending' &&
    toState === 'Shipped' &&
    checkIfFulfillmentByShippingCalculator(order, shippingCalculatorCode)
  );
}
