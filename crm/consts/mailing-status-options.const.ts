import { MailingStatus } from '../enums/mailing-status.enum';

export const MailingStatusOptions = [
    { label: '📝Черновик', value: MailingStatus.Draft },
    { label: '📬Отправка', value: MailingStatus.Sending }
];
