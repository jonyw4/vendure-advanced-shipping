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
            name: 'CustomerList'
          },
          {
            name: 'HistoryEntryList'
          },
          {
            name: 'OrderList'
          },
          {
            name: 'CountryList'
          },
          {
            name: 'CustomerGroupList'
          },
          {
            name: 'FacetList'
          },
          {
            name: 'JobList'
          },
          {
            name: 'PaymentMethodList'
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
            name: 'Administrator'
          },
          {
            name: 'User'
          },
          {
            name: 'Role'
          },
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
            name: 'Asset'
          },
          {
            name: 'Collection'
          },
          {
            name: 'ProductVariant'
          },
          {
            name: 'StockAdjustment'
          },
          {
            name: 'Sale'
          },
          {
            name: 'OrderLine'
          },
          {
            name: 'OrderItem'
          },
          {
            name: 'Fulfillment'
          },
          {
            name: 'Order'
          },
          {
            name: 'Customer'
          },
          {
            name: 'CustomerGroup'
          },
          {
            name: 'HistoryEntry'
          },
          {
            name: 'Address'
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
            name: 'Cancellation'
          },
          {
            name: 'Return'
          },
          {
            name: 'TaxRate'
          },
          {
            name: 'TaxCategory'
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
            name: 'Job'
          },
          {
            name: 'PaymentMethod'
          },
          {
            name: 'ProductOptionGroup'
          },
          {
            name: 'Product'
          },
          {
            name: 'Package'
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
        name: 'SearchResultPrice',
        possibleTypes: [
          {
            name: 'PriceRange'
          },
          {
            name: 'SinglePrice'
          }
        ]
      }
    ]
  }
};
export default result;
