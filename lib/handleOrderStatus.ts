import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { Lists } from ".keystone/types";
import { OrderStatus } from "../enums/order-status.enum";

export const handleOrderStatus: ListHooks<Lists.Order.TypeInfo>["resolveInput"] =
  async ({ context, item, operation, resolvedData }) => {
    if (operation === "update") {
      const order = await context.query.Order.findOne({
        where: { id: `${item.id}` },
        query: `leftPayments payments { status } payed`,
      });

      const status = () => {
        if (order.leftPayments === 0) {
          return OrderStatus.Finished;
        }
        if (order.payed > 0) {
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
