import gql from 'graphql-tag';
import { PACKAGE_FRAGMENT } from './fragment.graphql';

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

export const GET_PACKAGE = gql`
  query GetPackage($id: ID!) {
    package(id: $id) {
      ...Package
    }
  }
  ${PACKAGE_FRAGMENT}
`;
