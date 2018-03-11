import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Cotiz } from './cotiz.model';
import { CotizService } from './cotiz.service';

@Component({
    selector: 'jhi-cotiz-detail',
    templateUrl: './cotiz-detail.component.html'
})
export class CotizDetailComponent implements OnInit, OnDestroy {

    cotiz: Cotiz;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cotizService: CotizService,
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
            .subscribe((cotizResponse: HttpResponse<Cotiz>) => {
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
