import * as Types from '../../src/types/generated-admin-schema';

export type PackageTestFragment = { __typename?: 'Package' } & Pick<
  Types.Package,
  | 'id'
  | 'name'
  | 'massUnit'
  | 'distanceUnit'
  | 'width'
  | 'height'
  | 'length'
  | 'weight'
  | 'enabled'
>;
