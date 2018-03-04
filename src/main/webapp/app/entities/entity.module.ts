import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NdoumriMutuelleCotizModule } from './cotiz/cotiz.module';
import { NdoumriMutuelleEngagementModule } from './engagement/engagement.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NdoumriMutuelleCotizModule,
        NdoumriMutuelleEngagementModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NdoumriMutuelleEntityModule {}
