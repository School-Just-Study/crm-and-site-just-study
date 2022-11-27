import { PaymentStatus } from '../enums/payment-status.enum';

export const PaymentStatusOptions = [
    { label: '🤓Создан', value: PaymentStatus.Created },
    { label: '🥂Успешно оплачен', value: PaymentStatus.Successfully },
    { label: '🙅‍♂️Отмена', value: PaymentStatus.Cancelled },
    { label: '⚠️Ошибка', value: PaymentStatus.Error }
];
