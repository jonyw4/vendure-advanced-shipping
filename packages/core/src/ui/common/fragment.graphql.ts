import gql from 'graphql-tag';

export const PACKAGE_FRAGMENT = gql`
  fragment Package on Package {
    id
    name
    massUnit
    distanceUnit
    width
    height
    length
    weight
    isEnabled
  }
`;
