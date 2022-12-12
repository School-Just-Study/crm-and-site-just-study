import { ServerConfig } from '@keystone-6/core/types';
import { Lists, WorkTimeCutoffCreateInput } from '.keystone/types';
import ical, { VEvent } from 'node-ical';
import { addMinutes, differenceInMinutes, isThisQuarter } from 'date-fns';

/**
 * Синхронизируем календари менеджеров и учителей
 * Скрипт запускается по cron каждый день
 * @param app
 * @param createContext
 */
export const handleSyncCalendarManagers: ServerConfig<any>['extendExpressApp'] = async (app, context) => {
    app.get('/api/sync-calendar', async (req, res) => {
        console.info(new Date(), 'sync calendars');

        const managers = (await context.query.Manager.findMany({
            where: { work: { equals: true }, calendar: { notIn: '' } },
            query: `id calendar`
        })) as Lists.Manager.Item[];

        for (const manager of managers) {
            const cutoffForDeleteIds = await context.query.WorkTimeCutoff.findMany({
                where: { uid: { not: { equals: 'manual' } }, manager: { id: { equals: manager.id } } },
                query: 'id'
            });
            await context.query.WorkTimeCutoff.deleteMany({
                where: cutoffForDeleteIds
            });

            const webEvents = await ical.async.fromURL(manager.calendar);
            const events = Object.values(webEvents)?.filter((event) => event.type === 'VEVENT') as VEvent[];

            const workTimeCutoff: WorkTimeCutoffCreateInput[] = [];

            events.forEach((event) => {
                if (event.rrule) {
                    const repeat = event.rrule?.all();
                    const duration = differenceInMinutes(new Date(event.end), new Date(event.start));
                    repeat.forEach((date) => {
                        workTimeCutoff.push({
                            manager: { connect: { id: `${manager.id}` } },
                            title: event.summary,
                            startTime: date,
                            endTime: addMinutes(new Date(date), duration),
                            uid: event.uid
                        });
                    });
                } else {
                    workTimeCutoff.push({
                        manager: { connect: { id: `${manager.id}` } },
                        title: event.summary,
                        startTime: event.start,
                        endTime: event.end,
                        uid: event.uid
                    });
                }
            });

            const filterCutoff = workTimeCutoff.filter((event) => isThisQuarter(new Date(event.startTime)));

            await context.query.WorkTimeCutoff.createMany({
                data: filterCutoff
            });
        }

        res.sendStatus(200);
    });
};
