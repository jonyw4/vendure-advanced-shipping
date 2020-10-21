import { FulfillmentTransitionData, InjectableStrategy } from '@vendure/core';
import { Request, Response } from 'ups-js/lib/types';

type UPSCreateLabelRequest = Request.CreateShipment['ShipmentRequest'];
type OnTransitionStartFn =
  | boolean
  | string
  | void
  | Promise<boolean | string | void>;

export interface UPSBrazilPluginOptions {
  shippingCalculator: {
    username: string;
    password: string;
    timeout?: number;
    postalCode: string;
  };
  label: InjectableStrategy & {
    username: string;
    password: string;
    licenseNumber: string;
    isSandbox: boolean;
    timeout?: number;

    /**
     * Function that will be triggered every time that a need to create a UPS Label and put together with the request
     * You can use to map the order and fulfillment values based on your current integration with Vendure
     */
    map: (
      data: FulfillmentTransitionData
    ) => UPSCreateLabelRequest | Promise<UPSCreateLabelRequest>;

    /**
     * Function to save the label content after the creation.
     * Use handle the creation of your label
     */
    save: (
      data: FulfillmentTransitionData,
      labeResponse: Response.CreateShipment
    ) => OnTransitionStartFn;
  };
}
