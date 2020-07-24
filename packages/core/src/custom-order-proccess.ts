import { CustomOrderProcess } from '@vendure/core';

export const customOrderProcess: CustomOrderProcess<
  'Delivered' | 'Shipped' | 'Packed'
> = {
  transitions: {
    Fulfilled: {
      to: ['Packed'],
      mergeStrategy: 'merge'
    },
    PartiallyFulfilled: {
      to: ['Packed'],
      mergeStrategy: 'merge'
    },
    Packed: {
      to: ['Shipped', 'Delivered', 'Cancelled']
    },
    Shipped: {
      to: ['Cancelled', 'Delivered', 'Packed']
    },
    Delivered: {
      to: ['Cancelled']
    }
  }
  // async onTransitionStart(fromState, toState) {
  //   if (fromState === 'Shipped' && toState === 'Cancelled') {
  //     // TODO: Add script to cancel SHIPPING, in case or error return a string, if its okay return void
  //   }
  //   if (fromState === 'Shipped' && toState === 'Packed') {
  //     // TODO: Remove tracking code
  //   }
  // }
};
