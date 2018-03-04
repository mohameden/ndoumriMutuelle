import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CotizMySuffix } from './cotiz-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CotizMySuffix>;

@Injectable()
export class CotizMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cotizs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cotiz: CotizMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cotiz);
        return this.http.post<CotizMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cotiz: CotizMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cotiz);
        return this.http.put<CotizMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CotizMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CotizMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CotizMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CotizMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CotizMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CotizMySuffix[]>): HttpResponse<CotizMySuffix[]> {
        const jsonResponse: CotizMySuffix[] = res.body;
        const body: CotizMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CotizMySuffix.
     */
    private convertItemFromServer(cotiz: CotizMySuffix): CotizMySuffix {
        const copy: CotizMySuffix = Object.assign({}, cotiz);
        copy.paymentDate = this.dateUtils
            .convertDateTimeFromServer(cotiz.paymentDate);
        copy.dueDate = this.dateUtils
            .convertDateTimeFromServer(cotiz.dueDate);
        return copy;
    }

    /**
     * Convert a CotizMySuffix to a JSON which can be sent to the server.
     */
    private convert(cotiz: CotizMySuffix): CotizMySuffix {
        const copy: CotizMySuffix = Object.assign({}, cotiz);

        copy.paymentDate = this.dateUtils.toDate(cotiz.paymentDate);

        copy.dueDate = this.dateUtils.toDate(cotiz.dueDate);
        return copy;
    }
}
