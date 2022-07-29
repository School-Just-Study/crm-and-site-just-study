import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { Lists } from ".keystone/types";
import { OrderStatus } from "../enums/order-status.enum";
import { PaymentStatus } from "../enums/payment-status.enum";

export const handleOrderStatus: ListHooks<Lists.Order.TypeInfo>["resolveInput"] =
  async ({ context, item, operation, resolvedData }) => {
    if (operation === "update") {
      if (resolvedData.status) return resolvedData;

      const order = await context.query.Order.findOne({
        where: { id: `${item.id}` },
        query: `leftPayments payments { status }`,
      });

      const status = () => {
        const successPayed = order.payments.filter(
          (item: Lists.Payment.Item) =>
            item.status === PaymentStatus.Successfully
        );
        if (order.leftPayments === 0) {
          return OrderStatus.Finished;
        }
        if (successPayed.lenght > 0) {
          return OrderStatus.Processing;
        }
      };

      return {
        ...resolvedData,
        status: status(),
      };
    }
    return resolvedData;
  };
