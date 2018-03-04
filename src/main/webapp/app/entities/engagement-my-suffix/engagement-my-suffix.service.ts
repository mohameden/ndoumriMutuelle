import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EngagementMySuffix } from './engagement-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EngagementMySuffix>;

@Injectable()
export class EngagementMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/engagements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(engagement: EngagementMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(engagement);
        return this.http.post<EngagementMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(engagement: EngagementMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(engagement);
        return this.http.put<EngagementMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EngagementMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EngagementMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EngagementMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EngagementMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EngagementMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EngagementMySuffix[]>): HttpResponse<EngagementMySuffix[]> {
        const jsonResponse: EngagementMySuffix[] = res.body;
        const body: EngagementMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EngagementMySuffix.
     */
    private convertItemFromServer(engagement: EngagementMySuffix): EngagementMySuffix {
        const copy: EngagementMySuffix = Object.assign({}, engagement);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(engagement.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(engagement.endDate);
        return copy;
    }

    /**
     * Convert a EngagementMySuffix to a JSON which can be sent to the server.
     */
    private convert(engagement: EngagementMySuffix): EngagementMySuffix {
        const copy: EngagementMySuffix = Object.assign({}, engagement);

        copy.startDate = this.dateUtils.toDate(engagement.startDate);

        copy.endDate = this.dateUtils.toDate(engagement.endDate);
        return copy;
    }
}
