import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CotizComponent } from './cotiz.component';
import { CotizDetailComponent } from './cotiz-detail.component';
import { CotizPopupComponent } from './cotiz-dialog.component';
import { CotizDeletePopupComponent } from './cotiz-delete-dialog.component';

@Injectable()
export class CotizResolvePagingParams implements Resolve<any> {

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
        path: 'cotiz',
        component: CotizComponent,
        resolve: {
            'pagingParams': CotizResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cotiz/:id',
        component: CotizDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cotizPopupRoute: Routes = [
    {
        path: 'cotiz-new',
        component: CotizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cotiz/:id/edit',
        component: CotizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cotiz/:id/delete',
        component: CotizDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ndoumriMutuelleApp.cotiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
