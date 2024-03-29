import { ServerConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import ical, { ICalAlarmType } from 'ical-generator';
import { LessonStatus } from '../schemas/lessons/enum';
import { UserSubscription } from '@src/src/shared/lib/apollo/types';
import { Lists } from '.keystone/types';

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
            query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone subscriptions { name student { id } }`
        });

        lessons.forEach((lesson) => {
            const subName = lesson.subscriptions?.find((sub: UserSubscription) => sub?.student?.id === studentId)?.name;
            const teachersName = lesson.teachers.map((teacher: Lists.Manager.Item) => teacher.name);

            calendar.createEvent({
                start: new Date(lesson.startTime),
                end: new Date(lesson.endTime),
                summary: 'Онлайн-урок в школе Just Study',
                description: `Обучение по программе: ${subName}, Преподаватель ${teachersName.join(', ')}`,
                url: lesson.teachers[0]?.linkOnlineLesson,
                alarms: [{ type: ICalAlarmType.audio, triggerBefore: 3600 }]
            });
        });

        calendar.serve(res);
    });
};
