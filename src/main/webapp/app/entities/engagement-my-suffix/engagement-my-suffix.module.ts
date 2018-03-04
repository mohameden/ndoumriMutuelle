import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NdoumriMutuelleSharedModule } from '../../shared';
import {
    EngagementMySuffixService,
    EngagementMySuffixPopupService,
    EngagementMySuffixComponent,
    EngagementMySuffixDetailComponent,
    EngagementMySuffixDialogComponent,
    EngagementMySuffixPopupComponent,
    EngagementMySuffixDeletePopupComponent,
    EngagementMySuffixDeleteDialogComponent,
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
        EngagementMySuffixComponent,
        EngagementMySuffixDetailComponent,
        EngagementMySuffixDialogComponent,
        EngagementMySuffixDeleteDialogComponent,
        EngagementMySuffixPopupComponent,
        EngagementMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EngagementMySuffixComponent,
        EngagementMySuffixDialogComponent,
        EngagementMySuffixPopupComponent,
        EngagementMySuffixDeleteDialogComponent,
        EngagementMySuffixDeletePopupComponent,
    ],
    providers: [
        EngagementMySuffixService,
        EngagementMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NdoumriMutuelleEngagementMySuffixModule {}
