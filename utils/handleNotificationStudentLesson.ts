import { ServerConfig } from '@keystone-6/core/types';
import { LessonStatus } from '../enums/lesson-status';
import { notifyUpcomingLessons } from '../notifications/notifyUpcomingLessons';
import { addHours, isAfter } from 'date-fns';

/**
 * Напоминалка об уроке для ученика
 *  Скрипт запускается по cron каждые 10 мин
 * @param app
 * @param createContext
 */
export const handleNotificationStudentLesson: ServerConfig<any>['extendExpressApp'] =
    async (app, createContext) => {
        app.get('/api/check-lessons', async (req, res) => {
            const context = await createContext(req, res);
            console.info(new Date(), 'check lessons');

            const lessons = await context.query.Lesson.findMany({
                where: {
                    statusLesson: { equals: LessonStatus.Created },
                    notified: { not: { equals: true } }
                },
                query: `id startTime`
            });
            for (const lesson of lessons) {
                const leftTwoHours = isAfter(
                    new Date(),
                    addHours(new Date(lesson.startTime), -2)
                );
                if (leftTwoHours) {
                    await notifyUpcomingLessons(lesson.id, context);
                }
            }
            res.sendStatus(200);
        });
    };
