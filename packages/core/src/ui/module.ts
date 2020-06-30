import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, createResolveData } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PackageListComponent, PackageDetailComponent } from './components';
import PackageDetailResolver from './providers/routing/package-detail';
import { PackageFragment } from './common/fragment.graphql.types';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: PackageListComponent,
        data: {
          breadcrumb: [
            {
              label: 'Packages',
              link: ['/extensions', 'packages']
            }
          ]
        }
      },
      {
        path: ':id',
        component: PackageDetailComponent,
        resolve: createResolveData(PackageDetailResolver),
        data: { breadcrumb: packageDetailBreadcrumb }
      }
    ])
  ],
  declarations: [PackageListComponent, PackageDetailComponent],
  providers: [PackageDetailResolver]
})
export class AdvancedShippingCoreUiModule {}

export function packageDetailBreadcrumb(resolved: {
  entity: Observable<PackageFragment>;
}) {
  return resolved.entity.pipe(
    map((entity) => [
      {
        label: 'Packages',
        link: ['/extensions', 'packages']
      },
      {
        label: `${entity.id}`,
        link: []
      }
    ])
  );
}
