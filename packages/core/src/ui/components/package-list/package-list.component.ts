import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { GET_PACKAGE_LIST } from './package-list.graphql';
import {
  GetPackageListQuery,
  GetPackageListQueryVariables
} from './package-list.graphql.types';
import { PackageFragment } from '../../common/fragment.graphql.types';

@Component({
  selector: 'vdr-as-package-list',
  templateUrl: './package-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PackageListComponent extends BaseListComponent<
  GetPackageListQuery,
  PackageFragment,
  GetPackageListQueryVariables
> {
  constructor(
    private dataService: DataService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(router, route);
    super.setQueryFn(
      (...args: any[]) => this.dataService.query(GET_PACKAGE_LIST, args),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (data) => data.packages
    );
  }
}
