import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cotiz } from './cotiz.model';
import { CotizPopupService } from './cotiz-popup.service';
import { CotizService } from './cotiz.service';
import { User, UserService } from '../../shared';
import { Engagement, EngagementService } from '../engagement';

@Component({
    selector: 'jhi-cotiz-dialog',
    templateUrl: './cotiz-dialog.component.html'
})
export class CotizDialogComponent implements OnInit {

    cotiz: Cotiz;
    isSaving: boolean;

    users: User[];

    engagements: Engagement[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cotizService: CotizService,
        private userService: UserService,
        private engagementService: EngagementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.engagementService.query()
            .subscribe((res: HttpResponse<Engagement[]>) => { this.engagements = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackEngagementById(index: number, item: Engagement) {
        return item.id;
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
