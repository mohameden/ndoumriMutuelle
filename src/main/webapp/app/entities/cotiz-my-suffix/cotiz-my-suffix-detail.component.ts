import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CotizMySuffix } from './cotiz-my-suffix.model';
import { CotizMySuffixService } from './cotiz-my-suffix.service';

@Component({
    selector: 'jhi-cotiz-my-suffix-detail',
    templateUrl: './cotiz-my-suffix-detail.component.html'
})
export class CotizMySuffixDetailComponent implements OnInit, OnDestroy {

    cotiz: CotizMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cotizService: CotizMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCotizs();
    }

    load(id) {
        this.cotizService.find(id)
            .subscribe((cotizResponse: HttpResponse<CotizMySuffix>) => {
                this.cotiz = cotizResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCotizs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cotizListModification',
            (response) => this.load(this.cotiz.id)
        );
    }
}
