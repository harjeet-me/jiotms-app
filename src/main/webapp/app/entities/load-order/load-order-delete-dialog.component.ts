import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoadOrder } from 'app/shared/model/load-order.model';
import { LoadOrderService } from './load-order.service';

@Component({
  selector: 'jhi-load-order-delete-dialog',
  templateUrl: './load-order-delete-dialog.component.html'
})
export class LoadOrderDeleteDialogComponent {
  loadOrder: ILoadOrder;

  constructor(protected loadOrderService: LoadOrderService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.loadOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'loadOrderListModification',
        content: 'Deleted an loadOrder'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-load-order-delete-popup',
  template: ''
})
export class LoadOrderDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ loadOrder }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LoadOrderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.loadOrder = loadOrder;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/load-order', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/load-order', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
