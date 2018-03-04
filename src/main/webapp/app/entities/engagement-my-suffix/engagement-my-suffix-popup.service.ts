import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EngagementMySuffix } from './engagement-my-suffix.model';
import { EngagementMySuffixService } from './engagement-my-suffix.service';

@Injectable()
export class EngagementMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private engagementService: EngagementMySuffixService

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
                this.engagementService.find(id)
                    .subscribe((engagementResponse: HttpResponse<EngagementMySuffix>) => {
                        const engagement: EngagementMySuffix = engagementResponse.body;
                        engagement.startDate = this.datePipe
                            .transform(engagement.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        engagement.endDate = this.datePipe
                            .transform(engagement.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.engagementModalRef(component, engagement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.engagementModalRef(component, new EngagementMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    engagementModalRef(component: Component, engagement: EngagementMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.engagement = engagement;
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
