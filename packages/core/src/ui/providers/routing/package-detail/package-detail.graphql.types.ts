import * as Types from '../../../../shared-types';

import { PackageFragment } from '../../../common/fragment.graphql.types';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetPackageQueryVariables = Exact<{
  id: Types.Scalars['ID'];
}>;

export type GetPackageQuery = { __typename?: 'Query' } & {
  package: { __typename?: 'Package' } & PackageFragment;
};
