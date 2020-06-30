import gql from 'graphql-tag';
import { PACKAGE_FRAGMENT } from '../../common/fragment.graphql';

export const CREATE_PACKAGE = gql`
  mutation CreatePackage($input: CreatePackageInput!) {
    createPackage(input: $input) {
      ...Package
    }
  }
  ${PACKAGE_FRAGMENT}
`;

export const UPDATE_PACKAGE = gql`
  mutation UpdatePackage($input: UpdatePackageInput!) {
    updatePackage(input: $input) {
      ...Package
    }
  }
  ${PACKAGE_FRAGMENT}
`;
