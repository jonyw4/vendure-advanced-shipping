import * as Types from '../../shared-types';

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
