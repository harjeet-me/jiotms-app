import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBookingItem } from 'app/shared/model/booking-item.model';
import { AccountService } from 'app/core/auth/account.service';
import { BookingItemService } from './booking-item.service';

@Component({
  selector: 'jhi-booking-item',
  templateUrl: './booking-item.component.html'
})
export class BookingItemComponent implements OnInit, OnDestroy {
  bookingItems: IBookingItem[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected bookingItemService: BookingItemService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
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
      this.bookingItemService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IBookingItem[]>) => res.ok),
          map((res: HttpResponse<IBookingItem[]>) => res.body)
        )
        .subscribe((res: IBookingItem[]) => (this.bookingItems = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.bookingItemService
      .query()
      .pipe(
        filter((res: HttpResponse<IBookingItem[]>) => res.ok),
        map((res: HttpResponse<IBookingItem[]>) => res.body)
      )
      .subscribe(
        (res: IBookingItem[]) => {
          this.bookingItems = res;
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
    this.registerChangeInBookingItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBookingItem) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInBookingItems() {
    this.eventSubscriber = this.eventManager.subscribe('bookingItemListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
