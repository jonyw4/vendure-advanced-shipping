import * as Types from '../../shared-types';

import { PackageFragment } from '../../common/fragment.graphql.types';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetPackageListQueryVariables = Exact<{
  options: Types.PackageListOptions;
}>;

export type GetPackageListQuery = { __typename?: 'Query' } & {
  packages: { __typename?: 'PackageList' } & Pick<
    Types.PackageList,
    'totalItems'
  > & { items: Array<{ __typename?: 'Package' } & PackageFragment> };
};
