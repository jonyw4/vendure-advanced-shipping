import gql from 'graphql-tag';
import { PACKAGE_FRAGMENT } from '../../common/fragment.graphql';

export const GET_PACKAGE_LIST = gql`
  query GetPackageList($options: PackageListOptions!) {
    packages(options: $options) {
      items {
        ...Package
      }
      totalItems
    }
  }
  ${PACKAGE_FRAGMENT}
`;
