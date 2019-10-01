import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVendor } from 'app/shared/model/vendor.model';
import { AccountService } from 'app/core/auth/account.service';
import { VendorService } from './vendor.service';

@Component({
  selector: 'jhi-vendor',
  templateUrl: './vendor.component.html'
})
export class VendorComponent implements OnInit, OnDestroy {
  vendors: IVendor[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected vendorService: VendorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.vendorService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IVendor[]>) => res.ok),
          map((res: HttpResponse<IVendor[]>) => res.body)
        )
        .subscribe((res: IVendor[]) => (this.vendors = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.vendorService
      .query()
      .pipe(
        filter((res: HttpResponse<IVendor[]>) => res.ok),
        map((res: HttpResponse<IVendor[]>) => res.body)
      )
      .subscribe(
        (res: IVendor[]) => {
          this.vendors = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVendors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVendor) {
    return item.id;
  }

  registerChangeInVendors() {
    this.eventSubscriber = this.eventManager.subscribe('vendorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
