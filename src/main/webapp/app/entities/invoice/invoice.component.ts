import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'jhi-invoice',
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit, OnDestroy {
  invoices: IInvoice[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(protected invoiceService: InvoiceService, protected eventManager: JhiEventManager, protected activatedRoute: ActivatedRoute) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.invoiceService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IInvoice[]>) => (this.invoices = res.body));
      return;
    }
    this.invoiceService.query().subscribe((res: HttpResponse<IInvoice[]>) => {
      this.invoices = res.body;
      this.currentSearch = '';
    });
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
    this.registerChangeInInvoices();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IInvoice) {
    return item.id;
  }

  registerChangeInInvoices() {
    this.eventSubscriber = this.eventManager.subscribe('invoiceListModification', () => this.loadAll());
  }
}
