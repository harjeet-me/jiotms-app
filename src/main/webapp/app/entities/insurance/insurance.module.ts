import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JiotmsSharedModule } from 'app/shared/shared.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceDetailComponent } from './insurance-detail.component';
import { InsuranceUpdateComponent } from './insurance-update.component';
import { InsuranceDeletePopupComponent, InsuranceDeleteDialogComponent } from './insurance-delete-dialog.component';
import { insuranceRoute, insurancePopupRoute } from './insurance.route';

const ENTITY_STATES = [...insuranceRoute, ...insurancePopupRoute];

@NgModule({
  imports: [JiotmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    InsuranceComponent,
    InsuranceDetailComponent,
    InsuranceUpdateComponent,
    InsuranceDeleteDialogComponent,
    InsuranceDeletePopupComponent
  ],
  entryComponents: [InsuranceDeleteDialogComponent]
})
export class JiotmsInsuranceModule {}
