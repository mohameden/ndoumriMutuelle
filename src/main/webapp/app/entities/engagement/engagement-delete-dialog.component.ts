import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Engagement } from './engagement.model';
import { EngagementPopupService } from './engagement-popup.service';
import { EngagementService } from './engagement.service';

@Component({
    selector: 'jhi-engagement-delete-dialog',
    templateUrl: './engagement-delete-dialog.component.html'
})
export class EngagementDeleteDialogComponent {

    engagement: Engagement;

    constructor(
        private engagementService: EngagementService,
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
    selector: 'jhi-engagement-delete-popup',
    template: ''
})
export class EngagementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private engagementPopupService: EngagementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.engagementPopupService
                .open(EngagementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
