import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'booking',
        loadChildren: () => import('./booking/booking.module').then(m => m.JiotmsBookingModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.JiotmsInvoiceModule)
      },
      {
        path: 'invoice-item',
        loadChildren: () => import('./invoice-item/invoice-item.module').then(m => m.JiotmsInvoiceItemModule)
      },
      {
        path: 'insurance',
        loadChildren: () => import('./insurance/insurance.module').then(m => m.JiotmsInsuranceModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.JiotmsContactModule)
      },
      {
        path: 'booking-item',
        loadChildren: () => import('./booking-item/booking-item.module').then(m => m.JiotmsBookingItemModule)
      },
      {
        path: 'equipment',
        loadChildren: () => import('./equipment/equipment.module').then(m => m.JiotmsEquipmentModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.JiotmsCustomerModule)
      },
      {
        path: 'vendor',
        loadChildren: () => import('./vendor/vendor.module').then(m => m.JiotmsVendorModule)
      },
      {
        path: 'container',
        loadChildren: () => import('./container/container.module').then(m => m.JiotmsContainerModule)
      },
      {
        path: 'driver',
        loadChildren: () => import('./driver/driver.module').then(m => m.JiotmsDriverModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.JiotmsLocationModule)
      },
      {
        path: 'region',
        loadChildren: () => import('./region/region.module').then(m => m.JiotmsRegionModule)
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.JiotmsCountryModule)
      },
      {
        path: 'department',
        loadChildren: () => import('./department/department.module').then(m => m.JiotmsDepartmentModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.JiotmsTaskModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.JiotmsEmployeeModule)
      },
      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.JiotmsJobModule)
      },
      {
        path: 'job-history',
        loadChildren: () => import('./job-history/job-history.module').then(m => m.JiotmsJobHistoryModule)
      },
      {
        path: 'load-order',
        loadChildren: () => import('./load-order/load-order.module').then(m => m.JiotmsLoadOrderModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JiotmsEntityModule {}
