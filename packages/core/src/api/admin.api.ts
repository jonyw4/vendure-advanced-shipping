import { gql } from 'apollo-server-core';

const adminApiExtensions = gql`
  type Query {
    packages(options: PackageListOptions): PackageList!
  }
  input PackageListOptions
`;

export default adminApiExtensions;
