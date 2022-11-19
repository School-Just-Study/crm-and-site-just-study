import { ServerConfig } from '@keystone-6/core/types';
import { Lists, WorkTimeCutoffCreateInput } from '.keystone/types';
import { WebEventsData } from '../types';

const ical = require('node-ical');

/**
 * Синхронизируем календари менеджеров и учителей
 * Скрипт запускается по cron каждый день
 * @param app
 * @param createContext
 */
export const handleSyncCalendarManagers: ServerConfig<any>["extendExpressApp"] =
  async (app, createContext) => {
    app.get("/api/sync-calendar", async (req, res) => {
      const context = await createContext(req, res);
      console.info(new Date(), "sync calendars");

      const managers = await context.query.Manager.findMany({
          where: { work: { equals: true }, calendar: { notIn: '' } },
          query: `id calendar`
      }) as Lists.Manager.Item[];

      for (const manager of managers) {
          const cutoffForDeleteIds = await context.query.WorkTimeCutoff.findMany({
              where: {uid: {not: {equals:"manual"}}},
              query: "id"
          });
          await context.query.WorkTimeCutoff.deleteMany({
              where: cutoffForDeleteIds
          })

          const webEvents = await ical.async.fromURL(manager.calendar) as WebEventsData[];
          const events = Object.values(webEvents)?.filter((event) => event.type === "VEVENT")

          const data: WorkTimeCutoffCreateInput[] = [];
          events.forEach((event) => {
              data.push({
                  manager: {connect: {id: `${manager.id}`}},
                  title: event.summary,
                  startTime: event.start,
                  endTime: event.end,
                  uid: event.uid
              })
          })

          await context.query.WorkTimeCutoff.createMany({
              data
          })
      }

        res.sendStatus(200);
    });
  };
