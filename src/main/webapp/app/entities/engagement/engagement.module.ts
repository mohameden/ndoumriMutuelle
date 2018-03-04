import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NdoumriMutuelleSharedModule } from '../../shared';
import {
    EngagementService,
    EngagementPopupService,
    EngagementComponent,
    EngagementDetailComponent,
    EngagementDialogComponent,
    EngagementPopupComponent,
    EngagementDeletePopupComponent,
    EngagementDeleteDialogComponent,
    engagementRoute,
    engagementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...engagementRoute,
    ...engagementPopupRoute,
];

@NgModule({
    imports: [
        NdoumriMutuelleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EngagementComponent,
        EngagementDetailComponent,
        EngagementDialogComponent,
        EngagementDeleteDialogComponent,
        EngagementPopupComponent,
        EngagementDeletePopupComponent,
    ],
    entryComponents: [
        EngagementComponent,
        EngagementDialogComponent,
        EngagementPopupComponent,
        EngagementDeleteDialogComponent,
        EngagementDeletePopupComponent,
    ],
    providers: [
        EngagementService,
        EngagementPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NdoumriMutuelleEngagementModule {}
