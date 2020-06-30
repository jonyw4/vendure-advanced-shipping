import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuItem } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuItem(
      {
        id: 'packages',
        label: 'Packages',
        routerLink: ['/extensions/packages'],
        icon: 'block'
      },
      'settings',
      'shipping-methods'
    )
  ]
})
export class AdvancedShippingCoreUiSharedModule {}
