import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { Lists } from ".keystone/types";
import { OrderStatus } from "../enums/order-status.enum";
import { PaymentStatus } from "../enums/payment-status.enum";

export const handleOrderStatus: ListHooks<Lists.Order.TypeInfo>["afterOperation"] =
  async ({ context, item, operation }) => {
    if (operation !== "delete") {
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
        if (successPayed) {
          return OrderStatus.Processing;
        }
      };

      await context.query.Order.updateOne({
        where: { id: `${item.id}` },
        data: {
          status: status(),
        },
        query: "id",
      });
    }
  };
