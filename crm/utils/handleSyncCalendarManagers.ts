import { ServerConfig } from '@keystone-6/core/types';
import { Lists, WorkTimeCutoffCreateInput } from '.keystone/types';
import ical, { VEvent } from 'node-ical';
import { addDays, addMinutes, differenceInMinutes, isWithinInterval } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

/**
 * Синхронизируем календари менеджеров и учителей
 * Скрипт запускается по cron каждый день
 * @param app
 * @param context
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

            try {
                const webEvents = await ical.async.fromURL(manager.calendar);
                const events = Object.values(webEvents)?.filter((event) => event.type === 'VEVENT') as VEvent[];
                const filteredEvents = events.filter((event) =>
                    isWithinInterval(new Date(event.end), {
                        start: addDays(new Date(), -1),
                        end: addDays(new Date(), 20)
                    })
                );

                const workTimeCutoff: WorkTimeCutoffCreateInput[] = [];

                filteredEvents.forEach((event) => {
                    if (event.rrule) {
                        const repeat = event.rrule?.between(addDays(new Date(), -1), addDays(new Date(), 20));
                        const duration = differenceInMinutes(new Date(event.end), new Date(event.start));
                        repeat.forEach((date) => {
                            const dateWithTimeZone = utcToZonedTime(
                                new Date(date),
                                event?.rrule?.origOptions.tzid || 'Europe/Moscow'
                            );

                            const endTime = addMinutes(new Date(dateWithTimeZone), duration);

                            workTimeCutoff.push({
                                manager: { connect: { id: `${manager.id}` } },
                                title: event.summary,
                                startTime: dateWithTimeZone,
                                endTime: endTime,
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

                await context.query.WorkTimeCutoff.createMany({
                    data: workTimeCutoff
                });
                await context.query.WorkTimeCutoff.deleteMany({
                    where: cutoffForDeleteIds
                });
            } catch (e) {
                // @ts-ignore
                console.error(e.message);
            }
        }

        res.sendStatus(200);
    });
};
