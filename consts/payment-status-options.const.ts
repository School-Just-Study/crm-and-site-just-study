import { PaymentStatus } from "../enums/payment-status.enum";

export const PaymentStatusOptions = [
  { label: PaymentStatus.Created, value: PaymentStatus.Created },
  { label: PaymentStatus.Successfully, value: PaymentStatus.Successfully },
  { label: PaymentStatus.Cancelled, value: PaymentStatus.Cancelled },
];
