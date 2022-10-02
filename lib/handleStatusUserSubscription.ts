import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';
import { Statuses } from '../enums/statuses.enum';

/**
 * Обрабатываем статус пользовательского абонемента по количеству оставшихся занятий
 * @param context
 * @param item
 * @param operation
 * @param resolvedData
 */
export const handleStatusUserSubscription: ListHooks<Lists.UserSubscription.TypeInfo>["resolveInput"] =
  async ({ context, item, operation, resolvedData }) => {
    if (operation === "update") {
      const subscription = await context.query.UserSubscription.findOne({
        where: { id: `${item?.id}` },
        query: `lastCount`,
      });

      if (!subscription) return resolvedData;

      if (subscription.lastCount === 0) {
        return {
          ...resolvedData,
          status: Statuses.Finished,
        };
      }

      if (subscription.lastCount >= 1) {
        return {
          ...resolvedData,
          status: Statuses.Active,
        };
      }
    }
    return resolvedData;
  };
