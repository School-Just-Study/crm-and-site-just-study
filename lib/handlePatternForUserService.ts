import { ListHooks } from '@keystone-6/core/dist/declarations/src/types/config/hooks';
import { Lists } from '.keystone/types';

/**
 * Заполняем пустяе поля у сервиса студента данными из шаблона
 * @param context
 * @param item
 * @param resolvedData
 */
export const handlePatternForUserService: ListHooks<Lists.UserService.TypeInfo>["resolveInput"] =
  async ({ context, item, resolvedData }) => {
    const serviceId = item?.patternId || resolvedData.pattern!.connect!.id;

    // @ts-ignore
    const pattern: Lists.Service.Item = await context.query.Service.findOne({
      where: { id: `${serviceId}` },
      query: `name price`,
    });
    let newDate: Partial<Lists.UserService.Item> = {};

    if (!item?.name || !resolvedData.name) {
      newDate.name = pattern.name;
    }

    if (!item?.originalPrice || !resolvedData.originalPrice) {
      newDate.originalPrice = pattern.price;
    }

    if (!item?.price || !resolvedData.price) {
      newDate.price = pattern.price;
    }

    return {
      ...resolvedData,
      ...newDate,
    };
  };
