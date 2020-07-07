import * as Types from '../../types/generated-admin-schema';

export type PackageFragment = { __typename?: 'Package' } & Pick<
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
