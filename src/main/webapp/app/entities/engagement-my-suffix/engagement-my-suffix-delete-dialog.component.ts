import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EngagementMySuffix } from './engagement-my-suffix.model';
import { EngagementMySuffixPopupService } from './engagement-my-suffix-popup.service';
import { EngagementMySuffixService } from './engagement-my-suffix.service';

@Component({
    selector: 'jhi-engagement-my-suffix-delete-dialog',
    templateUrl: './engagement-my-suffix-delete-dialog.component.html'
})
export class EngagementMySuffixDeleteDialogComponent {

    engagement: EngagementMySuffix;

    constructor(
        private engagementService: EngagementMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.engagementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'engagementListModification',
                content: 'Deleted an engagement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-engagement-my-suffix-delete-popup',
    template: ''
})
export class EngagementMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private engagementPopupService: EngagementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.engagementPopupService
                .open(EngagementMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
