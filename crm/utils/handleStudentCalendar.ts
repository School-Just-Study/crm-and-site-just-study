import { ServerConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import ical, { ICalAlarmType } from 'ical-generator';
import { LessonStatus } from '../schemas/lessons/enum';

export const handleStudentCalendar: ServerConfig<any>['extendExpressApp'] = (app, context) => {
    app.get('/api/student/:id/lessons.ical', async (req, res) => {
        const studentId = req.params.id;
        console.info(new Date(), 'get students calendar', studentId);

        const calendar = ical({ name: 'Just Study - online english school' });

        const lessons = await context.query.Lesson.findMany({
            where: {
                students: { some: { id: { equals: studentId } } },
                statusLesson: { in: [LessonStatus.Created, LessonStatus.Completed] }
            },
            query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone subscription { name }`
        });

        lessons.forEach((lesson) => {
            calendar.createEvent({
                start: new Date(lesson.startTime),
                end: new Date(lesson.endTime),
                summary: 'Онлайн-урок в школе Just Study',
                description: `Обучение по программе: ${lesson?.subscription?.name}, Преподаватель ${lesson.teachers[0]?.name}`,
                url: lesson.teachers[0]?.linkOnlineLesson,
                alarms: [{ type: ICalAlarmType.audio, triggerBefore: 3600 }]
            });
        });

        calendar.serve(res);
    });
};
