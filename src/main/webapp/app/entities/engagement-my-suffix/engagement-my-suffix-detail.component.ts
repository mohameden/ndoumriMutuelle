import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EngagementMySuffix } from './engagement-my-suffix.model';
import { EngagementMySuffixService } from './engagement-my-suffix.service';

@Component({
    selector: 'jhi-engagement-my-suffix-detail',
    templateUrl: './engagement-my-suffix-detail.component.html'
})
export class EngagementMySuffixDetailComponent implements OnInit, OnDestroy {

    engagement: EngagementMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private engagementService: EngagementMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEngagements();
    }

    load(id) {
        this.engagementService.find(id)
            .subscribe((engagementResponse: HttpResponse<EngagementMySuffix>) => {
                this.engagement = engagementResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEngagements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'engagementListModification',
            (response) => this.load(this.engagement.id)
        );
    }
}
