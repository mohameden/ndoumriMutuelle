import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Engagement } from './engagement.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Engagement>;

@Injectable()
export class EngagementService {

    private resourceUrl =  SERVER_API_URL + 'api/engagements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(engagement: Engagement): Observable<EntityResponseType> {
        const copy = this.convert(engagement);
        return this.http.post<Engagement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(engagement: Engagement): Observable<EntityResponseType> {
        const copy = this.convert(engagement);
        return this.http.put<Engagement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Engagement>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Engagement[]>> {
        const options = createRequestOption(req);
        return this.http.get<Engagement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Engagement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Engagement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Engagement[]>): HttpResponse<Engagement[]> {
        const jsonResponse: Engagement[] = res.body;
        const body: Engagement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Engagement.
     */
    private convertItemFromServer(engagement: Engagement): Engagement {
        const copy: Engagement = Object.assign({}, engagement);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(engagement.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(engagement.endDate);
        return copy;
    }

    /**
     * Convert a Engagement to a JSON which can be sent to the server.
     */
    private convert(engagement: Engagement): Engagement {
        const copy: Engagement = Object.assign({}, engagement);

        copy.startDate = this.dateUtils.toDate(engagement.startDate);

        copy.endDate = this.dateUtils.toDate(engagement.endDate);
        return copy;
    }
}
