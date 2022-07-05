import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';

/**
 * Заполняем пустые поля у абоменента студента данными из шаблона
 * @param context
 * @param item
 * @param resolvedData
 */
export const handlePatternForUserSubscription: ListHooks<Lists.UserSubscription.TypeInfo>["resolveInput"] =
  async ({ context, item, resolvedData }) => {
    const subscriptionId = item?.patternId || resolvedData.pattern!.connect!.id;

    // @ts-ignore
    const pattern: Lists.Subscription.Item =
      await context.query.Subscription.findOne({
        where: { id: `${subscriptionId}` },
        query: `name visitCount price period`,
      });
    let newData: Partial<Lists.UserSubscription.Item> = {};

    if (!item?.name || !resolvedData.name) {
      newData.name = pattern.name;
    }

    if (!item?.visitCount || !resolvedData.visitCount) {
      newData.visitCount = pattern.visitCount;
    }

    if (!item?.originalPrice || !resolvedData.originalPrice) {
      newData.originalPrice = pattern.price;
    }

    if (!item?.price || !resolvedData.price) {
      newData.price = pattern.price;
    }

    if (!item?.period || !resolvedData.period) {
      newData.period = pattern.period;
    }

    return {
      ...resolvedData,
      ...newData,
    };
  };
