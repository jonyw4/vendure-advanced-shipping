export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'CreateAssetResult',
        possibleTypes: [
          {
            name: 'Asset'
          },
          {
            name: 'MimeTypeError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'NativeAuthenticationResult',
        possibleTypes: [
          {
            name: 'CurrentUser'
          },
          {
            name: 'InvalidCredentialsError'
          },
          {
            name: 'NativeAuthStrategyError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'AuthenticationResult',
        possibleTypes: [
          {
            name: 'CurrentUser'
          },
          {
            name: 'InvalidCredentialsError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'CreateChannelResult',
        possibleTypes: [
          {
            name: 'Channel'
          },
          {
            name: 'LanguageNotAvailableError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'UpdateChannelResult',
        possibleTypes: [
          {
            name: 'Channel'
          },
          {
            name: 'LanguageNotAvailableError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'CreateCustomerResult',
        possibleTypes: [
          {
            name: 'Customer'
          },
          {
            name: 'EmailAddressConflictError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'UpdateCustomerResult',
        possibleTypes: [
          {
            name: 'Customer'
          },
          {
            name: 'EmailAddressConflictError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'UpdateGlobalSettingsResult',
        possibleTypes: [
          {
            name: 'GlobalSettings'
          },
          {
            name: 'ChannelDefaultLanguageError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'TransitionOrderToStateResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'OrderStateTransitionError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'SettlePaymentResult',
        possibleTypes: [
          {
            name: 'Payment'
          },
          {
            name: 'SettlePaymentError'
          },
          {
            name: 'PaymentStateTransitionError'
          },
          {
            name: 'OrderStateTransitionError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'AddFulfillmentToOrderResult',
        possibleTypes: [
          {
            name: 'Fulfillment'
          },
          {
            name: 'EmptyOrderLineSelectionError'
          },
          {
            name: 'ItemsAlreadyFulfilledError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'CancelOrderResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'EmptyOrderLineSelectionError'
          },
          {
            name: 'QuantityTooGreatError'
          },
          {
            name: 'MultipleOrderError'
          },
          {
            name: 'CancelActiveOrderError'
          },
          {
            name: 'OrderStateTransitionError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'RefundOrderResult',
        possibleTypes: [
          {
            name: 'Refund'
          },
          {
            name: 'QuantityTooGreatError'
          },
          {
            name: 'NothingToRefundError'
          },
          {
            name: 'OrderStateTransitionError'
          },
          {
            name: 'MultipleOrderError'
          },
          {
            name: 'PaymentOrderMismatchError'
          },
          {
            name: 'RefundOrderStateError'
          },
          {
            name: 'AlreadyRefundedError'
          },
          {
            name: 'RefundStateTransitionError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'SettleRefundResult',
        possibleTypes: [
          {
            name: 'Refund'
          },
          {
            name: 'RefundStateTransitionError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'TransitionFulfillmentToStateResult',
        possibleTypes: [
          {
            name: 'Fulfillment'
          },
          {
            name: 'FulfillmentStateTransitionError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'RemoveOptionGroupFromProductResult',
        possibleTypes: [
          {
            name: 'Product'
          },
          {
            name: 'ProductOptionInUseError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'CreatePromotionResult',
        possibleTypes: [
          {
            name: 'Promotion'
          },
          {
            name: 'MissingConditionsError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'UpdatePromotionResult',
        possibleTypes: [
          {
            name: 'Promotion'
          },
          {
            name: 'MissingConditionsError'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'PaginatedList',
        possibleTypes: [
          {
            name: 'CustomerGroupList'
          },
          {
            name: 'JobList'
          },
          {
            name: 'PaymentMethodList'
          },
          {
            name: 'AdministratorList'
          },
          {
            name: 'AssetList'
          },
          {
            name: 'CollectionList'
          },
          {
            name: 'ProductVariantList'
          },
          {
            name: 'CountryList'
          },
          {
            name: 'CustomerList'
          },
          {
            name: 'FacetList'
          },
          {
            name: 'HistoryEntryList'
          },
          {
            name: 'OrderList'
          },
          {
            name: 'ProductList'
          },
          {
            name: 'PromotionList'
          },
          {
            name: 'RoleList'
          },
          {
            name: 'ShippingMethodList'
          },
          {
            name: 'TaxRateList'
          },
          {
            name: 'PackageList'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'Node',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Customer'
          },
          {
            name: 'Facet'
          },
          {
            name: 'Fulfillment'
          },
          {
            name: 'Job'
          },
          {
            name: 'Order'
          },
          {
            name: 'Product'
          },
          {
            name: 'ProductVariant'
          },
          {
            name: 'Address'
          },
          {
            name: 'Administrator'
          },
          {
            name: 'Asset'
          },
          {
            name: 'Channel'
          },
          {
            name: 'Country'
          },
          {
            name: 'CustomerGroup'
          },
          {
            name: 'FacetValue'
          },
          {
            name: 'HistoryEntry'
          },
          {
            name: 'OrderItem'
          },
          {
            name: 'OrderLine'
          },
          {
            name: 'Payment'
          },
          {
            name: 'Refund'
          },
          {
            name: 'PaymentMethod'
          },
          {
            name: 'ProductOptionGroup'
          },
          {
            name: 'ProductOption'
          },
          {
            name: 'Promotion'
          },
          {
            name: 'Role'
          },
          {
            name: 'ShippingMethod'
          },
          {
            name: 'StockAdjustment'
          },
          {
            name: 'Sale'
          },
          {
            name: 'Cancellation'
          },
          {
            name: 'Return'
          },
          {
            name: 'TaxCategory'
          },
          {
            name: 'TaxRate'
          },
          {
            name: 'User'
          },
          {
            name: 'AuthenticationMethod'
          },
          {
            name: 'Zone'
          },
          {
            name: 'Package'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'ErrorResult',
        possibleTypes: [
          {
            name: 'MimeTypeError'
          },
          {
            name: 'LanguageNotAvailableError'
          },
          {
            name: 'ChannelDefaultLanguageError'
          },
          {
            name: 'SettlePaymentError'
          },
          {
            name: 'EmptyOrderLineSelectionError'
          },
          {
            name: 'ItemsAlreadyFulfilledError'
          },
          {
            name: 'MultipleOrderError'
          },
          {
            name: 'CancelActiveOrderError'
          },
          {
            name: 'PaymentOrderMismatchError'
          },
          {
            name: 'RefundOrderStateError'
          },
          {
            name: 'NothingToRefundError'
          },
          {
            name: 'AlreadyRefundedError'
          },
          {
            name: 'QuantityTooGreatError'
          },
          {
            name: 'RefundStateTransitionError'
          },
          {
            name: 'PaymentStateTransitionError'
          },
          {
            name: 'FulfillmentStateTransitionError'
          },
          {
            name: 'ProductOptionInUseError'
          },
          {
            name: 'MissingConditionsError'
          },
          {
            name: 'NativeAuthStrategyError'
          },
          {
            name: 'InvalidCredentialsError'
          },
          {
            name: 'OrderStateTransitionError'
          },
          {
            name: 'EmailAddressConflictError'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'CustomField',
        possibleTypes: [
          {
            name: 'StringCustomFieldConfig'
          },
          {
            name: 'LocaleStringCustomFieldConfig'
          },
          {
            name: 'IntCustomFieldConfig'
          },
          {
            name: 'FloatCustomFieldConfig'
          },
          {
            name: 'BooleanCustomFieldConfig'
          },
          {
            name: 'DateTimeCustomFieldConfig'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'CustomFieldConfig',
        possibleTypes: [
          {
            name: 'StringCustomFieldConfig'
          },
          {
            name: 'LocaleStringCustomFieldConfig'
          },
          {
            name: 'IntCustomFieldConfig'
          },
          {
            name: 'FloatCustomFieldConfig'
          },
          {
            name: 'BooleanCustomFieldConfig'
          },
          {
            name: 'DateTimeCustomFieldConfig'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'SearchResultPrice',
        possibleTypes: [
          {
            name: 'PriceRange'
          },
          {
            name: 'SinglePrice'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'StockMovement',
        possibleTypes: [
          {
            name: 'StockAdjustment'
          },
          {
            name: 'Sale'
          },
          {
            name: 'Cancellation'
          },
          {
            name: 'Return'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'StockMovementItem',
        possibleTypes: [
          {
            name: 'StockAdjustment'
          },
          {
            name: 'Sale'
          },
          {
            name: 'Cancellation'
          },
          {
            name: 'Return'
          }
        ]
      }
    ]
  }
};
export default result;
