import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EngagementComponent } from './engagement.component';
import { EngagementDetailComponent } from './engagement-detail.component';
import { EngagementPopupComponent } from './engagement-dialog.component';
import { EngagementDeletePopupComponent } from './engagement-delete-dialog.component';

export const engagementRoute: Routes = [
    {
        path: 'engagement',
        component: EngagementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'engagement/:id',
        component: EngagementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const engagementPopupRoute: Routes = [
    {
        path: 'engagement-new',
        component: EngagementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'engagement/:id/edit',
        component: EngagementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'engagement/:id/delete',
        component: EngagementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
