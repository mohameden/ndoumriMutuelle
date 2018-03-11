import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cotiz } from './cotiz.model';
import { CotizPopupService } from './cotiz-popup.service';
import { CotizService } from './cotiz.service';

@Component({
    selector: 'jhi-cotiz-delete-dialog',
    templateUrl: './cotiz-delete-dialog.component.html'
})
export class CotizDeleteDialogComponent {

    cotiz: Cotiz;

    constructor(
        private cotizService: CotizService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cotizService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cotizListModification',
                content: 'Deleted an cotiz'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cotiz-delete-popup',
    template: ''
})
export class CotizDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cotizPopupService: CotizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cotizPopupService
                .open(CotizDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
