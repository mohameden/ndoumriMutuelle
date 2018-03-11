import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NdoumriMutuelleSharedModule } from '../../shared';
import { NdoumriMutuelleAdminModule } from '../../admin/admin.module';
import {
    CotizService,
    CotizPopupService,
    CotizComponent,
    CotizDetailComponent,
    CotizDialogComponent,
    CotizPopupComponent,
    CotizDeletePopupComponent,
    CotizDeleteDialogComponent,
    cotizRoute,
    cotizPopupRoute,
    CotizResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cotizRoute,
    ...cotizPopupRoute,
];

@NgModule({
    imports: [
        NdoumriMutuelleSharedModule,
        NdoumriMutuelleAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CotizComponent,
        CotizDetailComponent,
        CotizDialogComponent,
        CotizDeleteDialogComponent,
        CotizPopupComponent,
        CotizDeletePopupComponent,
    ],
    entryComponents: [
        CotizComponent,
        CotizDialogComponent,
        CotizPopupComponent,
        CotizDeleteDialogComponent,
        CotizDeletePopupComponent,
    ],
    providers: [
        CotizService,
        CotizPopupService,
        CotizResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NdoumriMutuelleCotizModule {}
