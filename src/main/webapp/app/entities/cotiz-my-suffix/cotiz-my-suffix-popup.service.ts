import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CotizMySuffix } from './cotiz-my-suffix.model';
import { CotizMySuffixService } from './cotiz-my-suffix.service';

@Injectable()
export class CotizMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cotizService: CotizMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cotizService.find(id)
                    .subscribe((cotizResponse: HttpResponse<CotizMySuffix>) => {
                        const cotiz: CotizMySuffix = cotizResponse.body;
                        cotiz.paymentDate = this.datePipe
                            .transform(cotiz.paymentDate, 'yyyy-MM-ddTHH:mm:ss');
                        cotiz.dueDate = this.datePipe
                            .transform(cotiz.dueDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.cotizModalRef(component, cotiz);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cotizModalRef(component, new CotizMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cotizModalRef(component: Component, cotiz: CotizMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cotiz = cotiz;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
