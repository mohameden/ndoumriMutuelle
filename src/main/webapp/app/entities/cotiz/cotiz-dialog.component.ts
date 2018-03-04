import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cotiz } from './cotiz.model';
import { CotizPopupService } from './cotiz-popup.service';
import { CotizService } from './cotiz.service';

@Component({
    selector: 'jhi-cotiz-dialog',
    templateUrl: './cotiz-dialog.component.html'
})
export class CotizDialogComponent implements OnInit {

    cotiz: Cotiz;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cotizService: CotizService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cotiz>>) {
        result.subscribe((res: HttpResponse<Cotiz>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cotiz) {
        this.eventManager.broadcast({ name: 'cotizListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cotiz-popup',
    template: ''
})
export class CotizPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cotizPopupService: CotizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cotizPopupService
                    .open(CotizDialogComponent as Component, params['id']);
            } else {
                this.cotizPopupService
                    .open(CotizDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
