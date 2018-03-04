import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EngagementMySuffix } from './engagement-my-suffix.model';
import { EngagementMySuffixPopupService } from './engagement-my-suffix-popup.service';
import { EngagementMySuffixService } from './engagement-my-suffix.service';
import { CotizMySuffix, CotizMySuffixService } from '../cotiz-my-suffix';

@Component({
    selector: 'jhi-engagement-my-suffix-dialog',
    templateUrl: './engagement-my-suffix-dialog.component.html'
})
export class EngagementMySuffixDialogComponent implements OnInit {

    engagement: EngagementMySuffix;
    isSaving: boolean;

    cotizs: CotizMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private engagementService: EngagementMySuffixService,
        private cotizService: CotizMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cotizService.query()
            .subscribe((res: HttpResponse<CotizMySuffix[]>) => { this.cotizs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<EngagementMySuffix>>) {
        result.subscribe((res: HttpResponse<EngagementMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EngagementMySuffix) {
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

    trackCotizById(index: number, item: CotizMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-engagement-my-suffix-popup',
    template: ''
})
export class EngagementMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private engagementPopupService: EngagementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.engagementPopupService
                    .open(EngagementMySuffixDialogComponent as Component, params['id']);
            } else {
                this.engagementPopupService
                    .open(EngagementMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
