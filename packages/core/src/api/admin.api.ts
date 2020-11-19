import gql from 'graphql-tag';

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
    width: Float!
    height: Float!
    length: Float!
    weight: Float!
    enabled: Boolean!
  }

  input CreatePackageInput {
    name: String!
    massUnit: MassUnit!
    distanceUnit: DistanceUnit!
    width: Float!
    height: Float!
    length: Float!
    weight: Float!
    enabled: Boolean!
  }

  input UpdatePackageInput {
    id: ID!
    name: String
    massUnit: MassUnit
    distanceUnit: DistanceUnit
    width: Float
    height: Float
    length: Float
    weight: Float
    enabled: Boolean
  }
  type PackageList implements PaginatedList {
    items: [Package!]!
    totalItems: Float!
  }
  extend type Query {
    packages(options: PackageListOptions): PackageList!
    package(id: ID!): Package!
  }
  extend type Mutation {
    createPackage(input: CreatePackageInput!): Package!
    updatePackage(input: UpdatePackageInput!): Package!
  }
  input PackageListOptions
`;

export default adminApiExtensions;
