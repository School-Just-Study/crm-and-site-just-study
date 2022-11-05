import { ServerConfig } from '@keystone-6/core/types';
import { isAfter } from 'date-fns';
import { Statuses } from '../enums/statuses.enum';

/**
 * Проверка даты действия абонемента
 * Скрипт запускается по cron каждый день
 * @param app
 * @param createContext
 */
export const handleCheckUserSubscription: ServerConfig<any>["extendExpressApp"] =
  async (app, createContext) => {
    app.get("/api/check-subscriptions", async (req, res) => {
      const context = await createContext(req, res);
      console.info(new Date(), "check subscription");
      res.sendStatus(200);

      const subscriptions = await context.query.UserSubscription.findMany({
        where: { status: { in: [Statuses.Active] } },
        query: `id endDate lastCount`,
      });

      for (const subscription of subscriptions) {
        const timeIsOver = isAfter(new Date(), new Date(subscription.endDate));
        const lessonsIsOver = subscription.lastCount === 0;
        if (timeIsOver || lessonsIsOver) {
          await context.query.UserSubscription.updateOne({
            where: { id: subscription.id },
            data: { status: Statuses.Finished },
          });
        }
      }
    });
  };
