import * as Types from '../../../../../common/src/generated-admin-schema';

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetPackageListQueryVariables = Exact<{
  options: Types.PackageListOptions;
}>;

export type GetPackageListQuery = { __typename?: 'Query' } & {
  packages: { __typename?: 'PackageList' } & Pick<
    Types.PackageList,
    'totalItems'
  > & {
      items: Array<
        { __typename?: 'Package' } & Pick<
          Types.Package,
          | 'id'
          | 'name'
          | 'massUnit'
          | 'distanceUnit'
          | 'width'
          | 'height'
          | 'length'
          | 'weight'
          | 'isEnabled'
        >
      >;
    };
};
