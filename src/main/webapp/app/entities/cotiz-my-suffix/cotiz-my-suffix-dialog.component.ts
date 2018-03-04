import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CotizMySuffix } from './cotiz-my-suffix.model';
import { CotizMySuffixPopupService } from './cotiz-my-suffix-popup.service';
import { CotizMySuffixService } from './cotiz-my-suffix.service';

@Component({
    selector: 'jhi-cotiz-my-suffix-dialog',
    templateUrl: './cotiz-my-suffix-dialog.component.html'
})
export class CotizMySuffixDialogComponent implements OnInit {

    cotiz: CotizMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cotizService: CotizMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cotiz.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cotizService.update(this.cotiz));
        } else {
            this.subscribeToSaveResponse(
                this.cotizService.create(this.cotiz));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CotizMySuffix>>) {
        result.subscribe((res: HttpResponse<CotizMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CotizMySuffix) {
        this.eventManager.broadcast({ name: 'cotizListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cotiz-my-suffix-popup',
    template: ''
})
export class CotizMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cotizPopupService: CotizMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cotizPopupService
                    .open(CotizMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cotizPopupService
                    .open(CotizMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
