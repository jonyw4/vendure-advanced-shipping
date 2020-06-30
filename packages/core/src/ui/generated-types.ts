export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type GetPackageListQueryVariables = Exact<{
  options: PackageListOptions;
}>;

export type GetPackageListQuery = { __typename?: 'Query' } & {
  packages: { __typename?: 'PackageList' } & Pick<PackageList, 'totalItems'> & {
      items: Array<
        { __typename?: 'Package' } & Pick<
          Package,
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
