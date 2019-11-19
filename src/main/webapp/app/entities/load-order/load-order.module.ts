import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JiotmsSharedModule } from 'app/shared/shared.module';
import { LoadOrderComponent } from './load-order.component';
import { LoadOrderDetailComponent } from './load-order-detail.component';
import { LoadOrderUpdateComponent } from './load-order-update.component';
import { LoadOrderDeletePopupComponent, LoadOrderDeleteDialogComponent } from './load-order-delete-dialog.component';
import { loadOrderRoute, loadOrderPopupRoute } from './load-order.route';

const ENTITY_STATES = [...loadOrderRoute, ...loadOrderPopupRoute];

@NgModule({
  imports: [JiotmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LoadOrderComponent,
    LoadOrderDetailComponent,
    LoadOrderUpdateComponent,
    LoadOrderDeleteDialogComponent,
    LoadOrderDeletePopupComponent
  ],
  entryComponents: [LoadOrderDeleteDialogComponent]
})
export class JiotmsLoadOrderModule {}
