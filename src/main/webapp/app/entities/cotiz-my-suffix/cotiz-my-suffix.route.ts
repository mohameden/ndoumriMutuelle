import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CotizMySuffixComponent } from './cotiz-my-suffix.component';
import { CotizMySuffixDetailComponent } from './cotiz-my-suffix-detail.component';
import { CotizMySuffixPopupComponent } from './cotiz-my-suffix-dialog.component';
import { CotizMySuffixDeletePopupComponent } from './cotiz-my-suffix-delete-dialog.component';

@Injectable()
export class CotizMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const cotizRoute: Routes = [
    {
        path: 'cotiz-my-suffix',
        component: CotizMySuffixComponent,
        resolve: {
            'pagingParams': CotizMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cotiz-my-suffix/:id',
        component: CotizMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cotizPopupRoute: Routes = [
    {
        path: 'cotiz-my-suffix-new',
        component: CotizMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cotiz-my-suffix/:id/edit',
        component: CotizMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cotiz-my-suffix/:id/delete',
        component: CotizMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
