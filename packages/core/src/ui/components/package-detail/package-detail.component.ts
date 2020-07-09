import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
  BaseDetailComponent,
  DataService,
  LanguageCode,
  NotificationService,
  ServerConfigService
} from '@vendure/admin-ui/core';
import { CREATE_PACKAGE, UPDATE_PACKAGE } from './package-detail.graphql';
import { PackageFragment } from '../../common/fragment.graphql.types';
import {
  CreatePackageMutation,
  CreatePackageMutationVariables,
  UpdatePackageMutation,
  UpdatePackageMutationVariables
} from './package-detail.graphql.types';
import { DistanceUnit, MassUnit } from '../../../types/generated-admin-schema';
import { mergeMap, take } from 'rxjs/operators';

@Component({
  selector: 'vdr-as-package-list',
  templateUrl: './package-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PackageDetailComponent
  extends BaseDetailComponent<PackageFragment>
  implements OnInit, OnDestroy {
  detailForm: FormGroup;
  distanceUnits = Object.values(DistanceUnit);
  massUnits = Object.values(MassUnit);

  constructor(
    router: Router,
    route: ActivatedRoute,
    serverConfigService: ServerConfigService,
    private changeDetector: ChangeDetectorRef,
    protected dataService: DataService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    super(route, router, serverConfigService, dataService);
    this.detailForm = this.formBuilder.group({
      name: ['', Validators.required],
      enabled: [true],
      width: [0, Validators.required],
      height: [0, Validators.required],
      length: [0, Validators.required],
      weight: [0, Validators.required],
      massUnit: ['', Validators.required],
      distanceUnit: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
  }

  saveButtonEnabled(): boolean {
    return this.detailForm.dirty && this.detailForm.valid;
  }

  create() {
    if (!this.detailForm.dirty) {
      return;
    }
    const formValue = this.detailForm.value;
    const input = {
      name: formValue.name,
      enabled: formValue.enabled,
      width: formValue.width,
      height: formValue.height,
      weight: formValue.weight,
      length: formValue.length,
      distanceUnit: formValue.distanceUnit,
      massUnit: formValue.massUnit
    } as CreatePackageMutationVariables['input'];
    this.dataService
      .mutate<CreatePackageMutation>(CREATE_PACKAGE, { input })
      .subscribe(
        (data) => {
          this.notificationService.success(_('common.notify-create-success'), {
            entity: 'Package'
          });
          this.detailForm.markAsPristine();
          this.changeDetector.markForCheck();
          this.router.navigate(['../', data.createPackage.id], {
            relativeTo: this.route
          });
        },
        () => {
          this.notificationService.error(_('common.notify-create-error'), {
            entity: 'Package'
          });
        }
      );
  }

  save() {
    if (!this.detailForm.dirty) {
      return;
    }
    const formValue = this.detailForm.value;
    this.entity$
      .pipe(
        take(1),
        mergeMap((packageBox) => {
          const input = {
            id: packageBox.id,
            name: formValue.name,
            enabled: formValue.enabled,
            width: formValue.width,
            height: formValue.height,
            weight: formValue.weight,
            length: formValue.length,
            distanceUnit: formValue.distanceUnit,
            massUnit: formValue.massUnit
          } as UpdatePackageMutationVariables['input'];
          return this.dataService.mutate<UpdatePackageMutation>(
            UPDATE_PACKAGE,
            { input }
          );
        })
      )
      .subscribe(
        () => {
          this.notificationService.success(_('common.notify-update-success'), {
            entity: 'Package'
          });
          this.detailForm.markAsPristine();
          this.changeDetector.markForCheck();
        },
        () => {
          this.notificationService.error(_('common.notify-update-error'), {
            entity: 'Package'
          });
        }
      );
  }

  /**
   * Update the form values when the entity changes.
   */
  protected setFormValues(
    entity: PackageFragment,
    languageCode: LanguageCode
  ): void {
    this.detailForm.patchValue({
      name: entity.name,
      width: entity.width,
      height: entity.height,
      weight: entity.weight,
      length: entity.length,
      distanceUnit: entity.distanceUnit,
      massUnit: entity.massUnit,
      enabled: entity.enabled
    });
  }
}
