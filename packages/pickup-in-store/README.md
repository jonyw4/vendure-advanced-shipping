# @vendure-advanced-shipping/pickup-in-store
A plugin to pickup order in store.

Features 
- A `ShippingCalculator` to create multiple stores to customer pickup the order based on Postal Code.
- A `PickupInStoreCronService` that adds a cronjob that checks every day at  mid night orders that its in the state of `Packed` in the interval of 7 days and that the shipping method its `pickup-in-store` (the same from the `ShippingCalculator`) after get, the service will cancel all of then.
- A `PickupInStoreCancelOrder` event that fired whenever an Order is cancelled by  Cron Job