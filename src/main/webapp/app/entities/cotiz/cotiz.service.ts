import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Cotiz } from './cotiz.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Cotiz>;

@Injectable()
export class CotizService {

    private resourceUrl =  SERVER_API_URL + 'api/cotizs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cotiz: Cotiz): Observable<EntityResponseType> {
        const copy = this.convert(cotiz);
        return this.http.post<Cotiz>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cotiz: Cotiz): Observable<EntityResponseType> {
        const copy = this.convert(cotiz);
        return this.http.put<Cotiz>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Cotiz>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Cotiz[]>> {
        const options = createRequestOption(req);
        return this.http.get<Cotiz[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Cotiz[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Cotiz = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Cotiz[]>): HttpResponse<Cotiz[]> {
        const jsonResponse: Cotiz[] = res.body;
        const body: Cotiz[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Cotiz.
     */
    private convertItemFromServer(cotiz: Cotiz): Cotiz {
        const copy: Cotiz = Object.assign({}, cotiz);
        copy.paymentDate = this.dateUtils
            .convertDateTimeFromServer(cotiz.paymentDate);
        copy.dueDate = this.dateUtils
            .convertDateTimeFromServer(cotiz.dueDate);
        return copy;
    }

    /**
     * Convert a Cotiz to a JSON which can be sent to the server.
     */
    private convert(cotiz: Cotiz): Cotiz {
        const copy: Cotiz = Object.assign({}, cotiz);

        copy.paymentDate = this.dateUtils.toDate(cotiz.paymentDate);

        copy.dueDate = this.dateUtils.toDate(cotiz.dueDate);
        return copy;
    }
}
