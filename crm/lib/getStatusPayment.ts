import { IPaymentStatus } from '@a2seven/yoo-checkout';
import { PaymentStatus } from '../enums/payment-status.enum';

export const getStatusPayment = (status: IPaymentStatus) => {
    switch (status) {
        case 'canceled':
            return PaymentStatus.Cancelled;
        case 'pending':
        case 'waiting_for_capture':
            return PaymentStatus.Created;
        case 'succeeded':
            return PaymentStatus.Successfully;
    }
};
