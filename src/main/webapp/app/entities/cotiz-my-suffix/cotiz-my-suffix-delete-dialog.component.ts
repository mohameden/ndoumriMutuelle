import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CotizMySuffix } from './cotiz-my-suffix.model';
import { CotizMySuffixPopupService } from './cotiz-my-suffix-popup.service';
import { CotizMySuffixService } from './cotiz-my-suffix.service';

@Component({
    selector: 'jhi-cotiz-my-suffix-delete-dialog',
    templateUrl: './cotiz-my-suffix-delete-dialog.component.html'
})
export class CotizMySuffixDeleteDialogComponent {

    cotiz: CotizMySuffix;

    constructor(
        private cotizService: CotizMySuffixService,
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
    selector: 'jhi-cotiz-my-suffix-delete-popup',
    template: ''
})
export class CotizMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cotizPopupService: CotizMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cotizPopupService
                .open(CotizMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
