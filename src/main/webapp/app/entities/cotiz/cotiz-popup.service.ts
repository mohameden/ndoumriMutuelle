import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Cotiz } from './cotiz.model';
import { CotizService } from './cotiz.service';

@Injectable()
export class CotizPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cotizService: CotizService

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
                    .subscribe((cotizResponse: HttpResponse<Cotiz>) => {
                        const cotiz: Cotiz = cotizResponse.body;
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
                    this.ngbModalRef = this.cotizModalRef(component, new Cotiz());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cotizModalRef(component: Component, cotiz: Cotiz): NgbModalRef {
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
