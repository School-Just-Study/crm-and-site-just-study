import { OrderStatus } from "../enums/order-status.enum";

export const OrderStatusOptions = [
  { label: OrderStatus.Created, value: OrderStatus.Created },
  { label: OrderStatus.Frozen, value: OrderStatus.Frozen },
  { label: OrderStatus.Processing, value: OrderStatus.Processing },
  { label: OrderStatus.Finished, value: OrderStatus.Finished },
  { label: OrderStatus.Cancelled, value: OrderStatus.Cancelled },
];
