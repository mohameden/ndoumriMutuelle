import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EngagementMySuffixComponent } from './engagement-my-suffix.component';
import { EngagementMySuffixDetailComponent } from './engagement-my-suffix-detail.component';
import { EngagementMySuffixPopupComponent } from './engagement-my-suffix-dialog.component';
import { EngagementMySuffixDeletePopupComponent } from './engagement-my-suffix-delete-dialog.component';

export const engagementRoute: Routes = [
    {
        path: 'engagement-my-suffix',
        component: EngagementMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'engagement-my-suffix/:id',
        component: EngagementMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const engagementPopupRoute: Routes = [
    {
        path: 'engagement-my-suffix-new',
        component: EngagementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'engagement-my-suffix/:id/edit',
        component: EngagementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'engagement-my-suffix/:id/delete',
        component: EngagementMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.engagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
