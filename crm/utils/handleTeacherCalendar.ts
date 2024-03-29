import { ServerConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import ical, { ICalAlarmType } from 'ical-generator';
import { LessonStatus } from '../schemas/lessons/enum';
import { Lists } from '.keystone/types';

export const handleTeacherCalendar: ServerConfig<any>['extendExpressApp'] = (app, context) => {
    app.get('/api/teacher/:id/lessons.ical', async (req, res) => {
        const teacherId = req.params.id;
        console.info(new Date(), 'get teachers calendar', teacherId);

        const calendar = ical({ name: 'Just Study - online english school' });

        const lessons = await context.query.Lesson.findMany({
            where: {
                teachers: { some: { id: { equals: teacherId } } },
                statusLesson: { in: [LessonStatus.Created, LessonStatus.Completed] }
            },
            query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone`
        });

        lessons.forEach((lesson) => {
            const studentsName = lesson.students.map((student: Lists.User.Item) => student.name);

            calendar.createEvent({
                start: new Date(lesson.startTime),
                end: new Date(lesson.endTime),
                summary: `${studentsName.join(', ')} - урок`,
                url: lesson.teachers[0]?.linkOnlineLesson,
                alarms: [{ type: ICalAlarmType.audio, triggerBefore: 3600 }]
            });
        });

        calendar.serve(res);
    });
};
