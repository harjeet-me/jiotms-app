import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { AccountService } from 'app/core/auth/account.service';
import { InvoiceItemService } from './invoice-item.service';

@Component({
  selector: 'jhi-invoice-item',
  templateUrl: './invoice-item.component.html'
})
export class InvoiceItemComponent implements OnInit, OnDestroy {
  invoiceItems: IInvoiceItem[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected invoiceItemService: InvoiceItemService,
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
      this.invoiceItemService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IInvoiceItem[]>) => res.ok),
          map((res: HttpResponse<IInvoiceItem[]>) => res.body)
        )
        .subscribe((res: IInvoiceItem[]) => (this.invoiceItems = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.invoiceItemService
      .query()
      .pipe(
        filter((res: HttpResponse<IInvoiceItem[]>) => res.ok),
        map((res: HttpResponse<IInvoiceItem[]>) => res.body)
      )
      .subscribe(
        (res: IInvoiceItem[]) => {
          this.invoiceItems = res;
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
    this.registerChangeInInvoiceItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IInvoiceItem) {
    return item.id;
  }

  registerChangeInInvoiceItems() {
    this.eventSubscriber = this.eventManager.subscribe('invoiceItemListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
