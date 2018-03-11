import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Engagement } from './engagement.model';
import { EngagementService } from './engagement.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-engagement',
    templateUrl: './engagement.component.html'
})
export class EngagementComponent implements OnInit, OnDestroy {
engagements: Engagement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private engagementService: EngagementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.engagementService.query().subscribe(
            (res: HttpResponse<Engagement[]>) => {
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

    trackId(index: number, item: Engagement) {
        return item.id;
    }
    registerChangeInEngagements() {
        this.eventSubscriber = this.eventManager.subscribe('engagementListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
