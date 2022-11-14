import { ServerConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import ical, { ICalAlarmType } from 'ical-generator';
import { LessonStatus } from '../enums/lesson-status';

export const handleTeacherCalendar: ServerConfig<any>["extendExpressApp"] = (
  app,
  createContext
) => {
  app.get("/api/teacher/:id/lessons.ical", async (req, res) => {
    const teacherId = req.params.id;
    console.info(new Date(), "get teachers calendar", teacherId);

    const context = await createContext(req, res);
    const calendar = ical({ name: "Just Study - online english school" });

    const lessons = await context.query.Lesson.findMany({
      where: {
        teachers: { some: { id: { equals: teacherId } } },
        statusLesson: { in: [LessonStatus.Created, LessonStatus.Completed] },
      },
      query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone subscription { name }`,
    });

    lessons.forEach((lesson) => {
      calendar.createEvent({
        start: new Date(lesson.startTime),
        end: new Date(lesson.endTime),
        summary: `${lesson.students[0].name} - урок`,
        url: lesson.teachers[0]?.linkOnlineLesson,
        alarms: [{ type: ICalAlarmType.audio, triggerBefore: 3600 }],
      });
    });

    calendar.serve(res);
  });
};
