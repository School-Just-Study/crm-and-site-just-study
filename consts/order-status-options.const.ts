import { OrderStatus } from "../enums/order-status.enum";

export const OrderStatusOptions = [
  { label: "Создан", value: OrderStatus.Created },
  { label: "Заморожен", value: OrderStatus.Frozen },
  { label: "В процессе оплаты", value: OrderStatus.Processing },
  { label: "Завершен", value: OrderStatus.Finished },
  { label: "Отменен", value: OrderStatus.Cancelled },
];
