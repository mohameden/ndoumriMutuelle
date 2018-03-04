import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Engagement } from './engagement.model';
import { EngagementPopupService } from './engagement-popup.service';
import { EngagementService } from './engagement.service';
import { Cotiz, CotizService } from '../cotiz';

@Component({
    selector: 'jhi-engagement-dialog',
    templateUrl: './engagement-dialog.component.html'
})
export class EngagementDialogComponent implements OnInit {

    engagement: Engagement;
    isSaving: boolean;

    cotizs: Cotiz[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private engagementService: EngagementService,
        private cotizService: CotizService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cotizService.query()
            .subscribe((res: HttpResponse<Cotiz[]>) => { this.cotizs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.engagement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.engagementService.update(this.engagement));
        } else {
            this.subscribeToSaveResponse(
                this.engagementService.create(this.engagement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Engagement>>) {
        result.subscribe((res: HttpResponse<Engagement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Engagement) {
        this.eventManager.broadcast({ name: 'engagementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCotizById(index: number, item: Cotiz) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-engagement-popup',
    template: ''
})
export class EngagementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private engagementPopupService: EngagementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.engagementPopupService
                    .open(EngagementDialogComponent as Component, params['id']);
            } else {
                this.engagementPopupService
                    .open(EngagementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
