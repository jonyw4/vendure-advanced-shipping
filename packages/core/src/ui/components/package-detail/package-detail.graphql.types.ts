import * as Types from '../../shared-types';

import { PackageFragment } from '../../common/fragment.graphql.types';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type CreatePackageMutationVariables = Exact<{
  input: Types.CreatePackageInput;
}>;

export type CreatePackageMutation = { __typename?: 'Mutation' } & {
  createPackage: { __typename?: 'Package' } & PackageFragment;
};

export type UpdatePackageMutationVariables = Exact<{
  input: Types.UpdatePackageInput;
}>;

export type UpdatePackageMutation = { __typename?: 'Mutation' } & {
  updatePackage: { __typename?: 'Package' } & PackageFragment;
};
