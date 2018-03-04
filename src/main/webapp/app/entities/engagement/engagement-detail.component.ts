import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Engagement } from './engagement.model';
import { EngagementService } from './engagement.service';

@Component({
    selector: 'jhi-engagement-detail',
    templateUrl: './engagement-detail.component.html'
})
export class EngagementDetailComponent implements OnInit, OnDestroy {

    engagement: Engagement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private engagementService: EngagementService,
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
            .subscribe((engagementResponse: HttpResponse<Engagement>) => {
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
