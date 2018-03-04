import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NdoumriMutuelleSharedModule } from '../../shared';
import {
    CotizMySuffixService,
    CotizMySuffixPopupService,
    CotizMySuffixComponent,
    CotizMySuffixDetailComponent,
    CotizMySuffixDialogComponent,
    CotizMySuffixPopupComponent,
    CotizMySuffixDeletePopupComponent,
    CotizMySuffixDeleteDialogComponent,
    cotizRoute,
    cotizPopupRoute,
    CotizMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cotizRoute,
    ...cotizPopupRoute,
];

@NgModule({
    imports: [
        NdoumriMutuelleSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CotizMySuffixComponent,
        CotizMySuffixDetailComponent,
        CotizMySuffixDialogComponent,
        CotizMySuffixDeleteDialogComponent,
        CotizMySuffixPopupComponent,
        CotizMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CotizMySuffixComponent,
        CotizMySuffixDialogComponent,
        CotizMySuffixPopupComponent,
        CotizMySuffixDeleteDialogComponent,
        CotizMySuffixDeletePopupComponent,
    ],
    providers: [
        CotizMySuffixService,
        CotizMySuffixPopupService,
        CotizMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NdoumriMutuelleCotizMySuffixModule {}
