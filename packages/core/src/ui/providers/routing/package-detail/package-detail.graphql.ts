import gql from 'graphql-tag';
import { PACKAGE_FRAGMENT } from '../../../common/fragment.graphql';

export const GET_PACKAGE = gql`
  query GetPackage($id: ID!) {
    package(id: $id) {
      ...Package
    }
  }
  ${PACKAGE_FRAGMENT}
`;
