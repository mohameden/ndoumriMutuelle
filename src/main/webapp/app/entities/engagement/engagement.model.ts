import { BaseEntity } from './../../shared';

export class Engagement implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public expectedAmount?: number,
        public startDate?: any,
        public endDate?: any,
        public comment?: string,
        public cotizs?: BaseEntity[],
        public ownerId?: number,
    ) {
    }
}
