import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { OrderStatus } from '../enums/order-status.enum';
import { Lists } from '.keystone/types';
import { PaymentStatus } from '../enums/payment-status.enum';

/**
 * Отправляем платеж в налоговую если платеж имеет статус Successfully, и отменяем его, если статус Cancelled
 * @param operation
 * @param item
 * @param context
 * @param resolvedData
 */
export const handleOrderStatusAfterPayment: ListHooks<Lists.Payment.TypeInfo>["afterOperation"] =
  async ({ item, context, resolvedData }) => {
    if (item) {
      const status = resolvedData.status || item.status;

      if (status === PaymentStatus.Successfully) {
        await context.query.Order.updateOne({
          where: { id: `${item.orderId}` },
          data: { status: OrderStatus.Finished },
        });
      } else {
        await context.query.Order.updateOne({
          where: { id: `${item.orderId}` },
          data: { status: OrderStatus.Processing },
        });
      }
    }
  };
