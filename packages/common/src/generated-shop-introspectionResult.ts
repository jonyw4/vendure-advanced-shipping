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
        name: 'Node',
        possibleTypes: [
          {
            name: 'Channel'
          },
          {
            name: 'Zone'
          },
          {
            name: 'Country'
          },
          {
            name: 'Customer'
          },
          {
            name: 'Address'
          },
          {
            name: 'Order'
          },
          {
            name: 'OrderLine'
          },
          {
            name: 'ProductVariant'
          },
          {
            name: 'Asset'
          },
          {
            name: 'TaxRate'
          },
          {
            name: 'TaxCategory'
          },
          {
            name: 'CustomerGroup'
          },
          {
            name: 'ProductOption'
          },
          {
            name: 'FacetValue'
          },
          {
            name: 'Facet'
          },
          {
            name: 'OrderItem'
          },
          {
            name: 'Fulfillment'
          },
          {
            name: 'Promotion'
          },
          {
            name: 'Payment'
          },
          {
            name: 'Refund'
          },
          {
            name: 'ShippingMethod'
          },
          {
            name: 'HistoryEntry'
          },
          {
            name: 'Administrator'
          },
          {
            name: 'User'
          },
          {
            name: 'Role'
          },
          {
            name: 'Collection'
          },
          {
            name: 'Product'
          },
          {
            name: 'ProductOptionGroup'
          },
          {
            name: 'Cancellation'
          },
          {
            name: 'PaymentMethod'
          },
          {
            name: 'Return'
          },
          {
            name: 'Sale'
          },
          {
            name: 'StockAdjustment'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'PaginatedList',
        possibleTypes: [
          {
            name: 'OrderList'
          },
          {
            name: 'CustomerList'
          },
          {
            name: 'HistoryEntryList'
          },
          {
            name: 'CollectionList'
          },
          {
            name: 'ProductVariantList'
          },
          {
            name: 'ProductList'
          },
          {
            name: 'AdministratorList'
          },
          {
            name: 'AssetList'
          },
          {
            name: 'CountryList'
          },
          {
            name: 'FacetList'
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
        name: 'CustomField',
        possibleTypes: [
          {
            name: 'BooleanCustomFieldConfig'
          },
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
            name: 'DateTimeCustomFieldConfig'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'StockMovement',
        possibleTypes: [
          {
            name: 'Cancellation'
          },
          {
            name: 'Return'
          },
          {
            name: 'Sale'
          },
          {
            name: 'StockAdjustment'
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
