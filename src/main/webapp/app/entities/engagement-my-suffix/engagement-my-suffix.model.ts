import { BaseEntity } from './../../shared';

export class EngagementMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public expectedAmount?: number,
        public startDate?: any,
        public endDate?: any,
        public comment?: string,
        public cotizId?: number,
    ) {
    }
}
