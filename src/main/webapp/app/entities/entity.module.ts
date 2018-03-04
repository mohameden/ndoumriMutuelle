import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NdoumriMutuelleCotizMySuffixModule } from './cotiz-my-suffix/cotiz-my-suffix.module';
import { NdoumriMutuelleEngagementMySuffixModule } from './engagement-my-suffix/engagement-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NdoumriMutuelleCotizMySuffixModule,
        NdoumriMutuelleEngagementMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NdoumriMutuelleEntityModule {}
