import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EngagementMySuffix } from './engagement-my-suffix.model';
import { EngagementMySuffixService } from './engagement-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-engagement-my-suffix',
    templateUrl: './engagement-my-suffix.component.html'
})
export class EngagementMySuffixComponent implements OnInit, OnDestroy {
engagements: EngagementMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private engagementService: EngagementMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.engagementService.query().subscribe(
            (res: HttpResponse<EngagementMySuffix[]>) => {
                this.engagements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEngagements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EngagementMySuffix) {
        return item.id;
    }
    registerChangeInEngagements() {
        this.eventSubscriber = this.eventManager.subscribe('engagementListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
