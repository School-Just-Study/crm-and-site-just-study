import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { Lists } from ".keystone/types";
import { formatInTimeZone } from "date-fns-tz";
import { localeDate } from "../lib/localeDate";
import { mailer } from "../lib/nodemailer";
import { from } from "./index";
import { templateLesson } from "../mailTemplate/templateLesson";
import { BACKEND_URL } from "../config";

const infoForStudent = (lesson: any, student: Lists.User.Item) => {
  const dateFormat = formatInTimeZone(
    new Date(lesson.startTime),
    lesson.timeZone,
    "d MMMM yyyy HH:mm zzz",
    {
      locale: localeDate("ru"),
    }
  );

  return `
      <div style='display:flex; flex-direction: column;'>
          <p>${student.name},</p>
          <p>🔔 Напоминаем о занятии: ${lesson.subscription.name}</p>
          <p>⏰ Дата: ${dateFormat}, ${lesson.timeZone}</p>
          <p>🏫 Ссылка на онлайн урок: ${lesson.teachers[0].linkOnlineLesson}</p>
      </div>
    `;
};

/**
 * Уведомление о занятии
 * @param lessonId
 * @param ctx
 */
export const notifyUpcomingLessons = async (
  lessonId: Lists.Lesson.Item["id"],
  ctx: KeystoneContext
) => {
  const lesson = await ctx.query.Lesson.findOne({
    where: { id: `${lessonId}` },
    query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone subscription { name }`,
  });

  for (const user of lesson.students) {
    await mailer.sendMail(
      {
        to: user.email,
        from,
        subject: "🔔 Напоминание о занятии",
        html: templateLesson(
          "🔔 Напоминание о занятии",
          infoForStudent(lesson, user),
          `${BACKEND_URL}/api/student/${user.id}/lessons.ical`
        ),
      },
      async (err, info) => {
        if (err) {
          console.error(err);
        } else {
          await ctx.query.Lesson.updateOne({
            where: { id: `${lessonId}` },
            data: { notified: true },
          });
        }
      }
    );
  }
};
