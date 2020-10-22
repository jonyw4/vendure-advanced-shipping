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
        kind: 'INTERFACE',
        name: 'PaginatedList',
        possibleTypes: [
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
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'Node',
        possibleTypes: [
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
            name: 'Collection'
          },
          {
            name: 'Country'
          },
          {
            name: 'CustomerGroup'
          },
          {
            name: 'Customer'
          },
          {
            name: 'FacetValue'
          },
          {
            name: 'Facet'
          },
          {
            name: 'HistoryEntry'
          },
          {
            name: 'Order'
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
            name: 'Fulfillment'
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
            name: 'Product'
          },
          {
            name: 'ProductVariant'
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
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'ErrorResult',
        possibleTypes: [
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
          },
          {
            name: 'OrderModificationError'
          },
          {
            name: 'OrderLimitError'
          },
          {
            name: 'NegativeQuantityError'
          },
          {
            name: 'OrderPaymentStateError'
          },
          {
            name: 'PaymentFailedError'
          },
          {
            name: 'PaymentDeclinedError'
          },
          {
            name: 'CouponCodeInvalidError'
          },
          {
            name: 'CouponCodeExpiredError'
          },
          {
            name: 'CouponCodeLimitError'
          },
          {
            name: 'AlreadyLoggedInError'
          },
          {
            name: 'MissingPasswordError'
          },
          {
            name: 'PasswordAlreadySetError'
          },
          {
            name: 'VerificationTokenInvalidError'
          },
          {
            name: 'VerificationTokenExpiredError'
          },
          {
            name: 'IdentifierChangeTokenInvalidError'
          },
          {
            name: 'IdentifierChangeTokenExpiredError'
          },
          {
            name: 'PasswordResetTokenInvalidError'
          },
          {
            name: 'PasswordResetTokenExpiredError'
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
        name: 'UpdateOrderItemsResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'OrderModificationError'
          },
          {
            name: 'OrderLimitError'
          },
          {
            name: 'NegativeQuantityError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'RemoveOrderItemsResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'OrderModificationError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'SetOrderShippingMethodResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'OrderModificationError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'ApplyCouponCodeResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'CouponCodeExpiredError'
          },
          {
            name: 'CouponCodeInvalidError'
          },
          {
            name: 'CouponCodeLimitError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'AddPaymentToOrderResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'OrderPaymentStateError'
          },
          {
            name: 'PaymentFailedError'
          },
          {
            name: 'PaymentDeclinedError'
          },
          {
            name: 'OrderStateTransitionError'
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
        name: 'SetCustomerForOrderResult',
        possibleTypes: [
          {
            name: 'Order'
          },
          {
            name: 'AlreadyLoggedInError'
          },
          {
            name: 'EmailAddressConflictError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'RegisterCustomerAccountResult',
        possibleTypes: [
          {
            name: 'Success'
          },
          {
            name: 'MissingPasswordError'
          },
          {
            name: 'NativeAuthStrategyError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'RefreshCustomerVerificationResult',
        possibleTypes: [
          {
            name: 'Success'
          },
          {
            name: 'NativeAuthStrategyError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'VerifyCustomerAccountResult',
        possibleTypes: [
          {
            name: 'CurrentUser'
          },
          {
            name: 'VerificationTokenInvalidError'
          },
          {
            name: 'VerificationTokenExpiredError'
          },
          {
            name: 'MissingPasswordError'
          },
          {
            name: 'PasswordAlreadySetError'
          },
          {
            name: 'NativeAuthStrategyError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'UpdateCustomerPasswordResult',
        possibleTypes: [
          {
            name: 'Success'
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
        name: 'RequestUpdateCustomerEmailAddressResult',
        possibleTypes: [
          {
            name: 'Success'
          },
          {
            name: 'InvalidCredentialsError'
          },
          {
            name: 'EmailAddressConflictError'
          },
          {
            name: 'NativeAuthStrategyError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'UpdateCustomerEmailAddressResult',
        possibleTypes: [
          {
            name: 'Success'
          },
          {
            name: 'IdentifierChangeTokenInvalidError'
          },
          {
            name: 'IdentifierChangeTokenExpiredError'
          },
          {
            name: 'NativeAuthStrategyError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'RequestPasswordResetResult',
        possibleTypes: [
          {
            name: 'Success'
          },
          {
            name: 'NativeAuthStrategyError'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'ResetPasswordResult',
        possibleTypes: [
          {
            name: 'CurrentUser'
          },
          {
            name: 'PasswordResetTokenInvalidError'
          },
          {
            name: 'PasswordResetTokenExpiredError'
          },
          {
            name: 'NativeAuthStrategyError'
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
