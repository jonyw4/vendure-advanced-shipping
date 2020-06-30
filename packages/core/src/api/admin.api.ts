import { gql } from 'apollo-server-core';

const adminApiExtensions = gql`
  enum DistanceUnit {
    cm
    ft
    in
  }
  enum MassUnit {
    g
    kg
    lb
    oz
  }
  type Package implements Node {
    id: ID!
    name: String!
    massUnit: MassUnit!
    distanceUnit: DistanceUnit!
    width: Int!
    height: Int!
    length: Int!
    weight: Int!
    isEnabled: Boolean!
  }

  input CreatePackageInput {
    name: String!
    massUnit: MassUnit!
    distanceUnit: DistanceUnit!
    width: Int!
    height: Int!
    length: Int!
    weight: Int!
    isEnabled: Boolean!
  }
  type PackageList implements PaginatedList {
    items: [Package!]!
    totalItems: Int!
  }
  extend type Query {
    packages(options: PackageListOptions): PackageList!
  }
  input PackageListOptions

  extend type Mutation {
    createPackage(input: CreatePackageInput!): Package!
  }
`;

export default adminApiExtensions;
