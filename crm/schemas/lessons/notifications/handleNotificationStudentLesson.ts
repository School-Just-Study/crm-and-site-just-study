import { ServerConfig } from '@keystone-6/core/types';
import { LessonStatus } from '../enum';
import { notifyUpcomingLessons } from './notifyUpcomingLessons';
import { addHours, isAfter } from 'date-fns';
import { ViewStatus } from '../../../enums/view-status.enum';
import { syncLessonsWithSchedule } from '../schedule/hooks';
import { Lists } from '.keystone/types';

/**
 * Напоминалка об уроке для ученика
 *  Скрипт запускается по cron каждые 10 мин
 * @param app
 * @param context
 */
export const handleNotificationStudentLesson: ServerConfig<any>['extendExpressApp'] = async (app, context) => {
    app.get('/api/check-lessons', async (req, res) => {
        console.info(new Date(), 'check lessons');

        const lessons = await context.query.Lesson.findMany({
            where: {
                statusLesson: { equals: LessonStatus.Created },
                notified: { not: { equals: true } }
            },
            query: `id startTime`
        });
        for (const lesson of lessons) {
            const leftTwoHours = isAfter(new Date(), addHours(new Date(lesson.startTime), -2));
            if (leftTwoHours) {
                await notifyUpcomingLessons(lesson.id, context);
            }
        }
        res.sendStatus(200);

        /**
         * Проверка наличие активного абонемента у ученика и при умеющейся записи на урок
         * и отсутствия прикрепленного абонемента к уроку автоматически исправляет это
         */
        const checkLessonsSub = await context.query.Lesson.findMany({
            where: {
                notAlert: { equals: true },
                statusLesson: { equals: LessonStatus.Created }
            },
            query: `id`
        });
        const dataForUpdate = checkLessonsSub.map(({ id }) => {
            return {
                where: { id: id },
                data: { notAlert: true }
            };
        });
        await context.query.Lesson.updateMany({
            data: dataForUpdate
        });

        /**
         * Создание уроков из графиков уроков
         */
        const activeLessonSchedules = (await context.query.LessonSchedule.findMany({
            where: { statusView: { equals: ViewStatus.Show } },
            query: `id timeZone startPeriod endPeriod`
        })) as Lists.LessonSchedule.Item[];
        for (const item of activeLessonSchedules) {
            await syncLessonsWithSchedule(context, item);
        }
    });
};
