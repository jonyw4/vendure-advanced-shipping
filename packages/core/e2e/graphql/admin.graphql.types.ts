import * as Types from '../../src/types/generated-admin-schema';

import { PackageTestFragment } from './fragment.graphql.types';

export type CreatePackageMutationVariables = Types.Exact<{
  input: Types.CreatePackageInput;
}>;

export type CreatePackageMutation = { __typename?: 'Mutation' } & {
  createPackage: { __typename?: 'Package' } & PackageTestFragment;
};

export type UpdatePackageMutationVariables = Types.Exact<{
  input: Types.UpdatePackageInput;
}>;

export type UpdatePackageMutation = { __typename?: 'Mutation' } & {
  updatePackage: { __typename?: 'Package' } & PackageTestFragment;
};

export type GetPackageListQueryVariables = Types.Exact<{
  options: Types.PackageListOptions;
}>;

export type GetPackageListQuery = { __typename?: 'Query' } & {
  packages: { __typename?: 'PackageList' } & Pick<
    Types.PackageList,
    'totalItems'
  > & { items: Array<{ __typename?: 'Package' } & PackageTestFragment> };
};

export type GetPackageQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type GetPackageQuery = { __typename?: 'Query' } & {
  package: { __typename?: 'Package' } & PackageTestFragment;
};
