import { ServerConfig } from '@keystone-6/core/types';
import { Statuses } from '../enums/statuses.enum';
import { isAfter } from 'date-fns';

/**
 * Проверка даты действия абонемента
 * Скрипт запускается по cron каждый день
 * @param app
 * @param context
 */
export const handleCheckUserSubscription: ServerConfig<any>['extendExpressApp'] = async (app, context) => {
    app.get('/api/check-subscriptions', async (req, res) => {
        console.info(new Date(), 'check subscription');

        const subscriptions = await context.query.UserSubscription.findMany({
            where: { status: { equals: Statuses.Active } },
            query: `id endDate lastCount`
        });

        for (const subscription of subscriptions) {
            const timeIsOver = isAfter(new Date(), new Date(subscription.endDate));
            const lessonsIsOver = subscription.lastCount <= 0;
            if (timeIsOver || lessonsIsOver) {
                await context.query.UserSubscription.updateOne({
                    where: { id: subscription.id },
                    data: { status: Statuses.Finished }
                });
            }
        }
        res.sendStatus(200);
    });
};
