import { BaseEntity } from './../../shared';

export const enum PaymentMode {
    'CASH',
    'OTHER'
}

export class Cotiz implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public currency?: string,
        public paymentDate?: any,
        public dueDate?: any,
        public paymentMode?: PaymentMode,
        public comment?: string,
        public userId?: number,
        public engagementId?: number,
    ) {
    }
}
