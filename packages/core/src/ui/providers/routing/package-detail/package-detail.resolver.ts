import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseEntityResolver } from '@vendure/admin-ui/core';
import {
  DistanceUnit,
  MassUnit
} from '@vendure-advanced-shipping/common/lib/generated-admin-schema';
import { GET_PACKAGE } from './package-detail.graphql';
import { PackageFragment } from '../../../common/fragment.graphql.types';
import {
  GetPackageQuery,
  GetPackageQueryVariables
} from './package-detail.graphql.types';

@Injectable()
export default class PackageDetailResolver extends BaseEntityResolver<
  PackageFragment
> {
  constructor(router: Router, dataService: DataService) {
    super(
      router,
      {
        __typename: 'Package',
        id: '',
        name: '',
        width: 0,
        height: 0,
        weight: 0,
        length: 0,
        distanceUnit: DistanceUnit.Cm,
        massUnit: MassUnit.G,
        enabled: true
      },
      (id) =>
        dataService
          .query<GetPackageQuery, GetPackageQueryVariables>(GET_PACKAGE, {
            id: id
          })
          .mapStream((data) => data.package)
    );
  }
}
