import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { Lists } from ".keystone/types";
import { format } from "date-fns-tz";
import { localeDate } from "../lib/localeDate";
import { mailer } from "../lib/nodemailer";
import { from } from "./index";
import { baseTemplateEmail } from "../mailTemplate/base";

const infoForTeacher = (lesson: any, teacher: Lists.Manager.Item) => {
  const dateFormatStart = format(
    new Date(lesson.startTime),
    "d MMMM yyyy HH:mm zzz",
    {
      timeZone: teacher.timeZone,
      locale: localeDate(teacher.language),
    }
  );

  const dateFormatEnd = format(
    new Date(lesson.startTime),
    "d MMMM yyyy HH:mm zzz",
    {
      timeZone: teacher.timeZone,
      locale: localeDate(teacher.language),
    }
  );

  const studentsName = lesson.students.map(
    (student: Lists.User.Item) => student.name
  );

  return `
      <div style='display:flex; flex-direction: column;'>
          <p>🧑🏼‍🏫 ${teacher.name},</p>
          <p>Отменен урок с учеником: ${studentsName.join(", ")} </p>
          <p>⏰ Начало: ${dateFormatStart}, ${lesson.timeZone}</p>
          <p>⏰ Конец: ${dateFormatEnd}, ${lesson.timeZone}</p>
      </div>
    `;
};

/**
 * Уведомление об отмене урока
 * @param lessonId
 * @param ctx
 */
export const notifyLessonCanceled = async (
  lessonId: Lists.Lesson.Item["id"],
  ctx: KeystoneContext
) => {
  const lesson = await ctx.query.Lesson.findOne({
    where: { id: `${lessonId}` },
    query: `id statusLesson startTime endTime teachers { id email name language timeZone } students { id name email }`,
  });

  for (const teacher of lesson.teachers) {
    await mailer.sendMail({
      to: teacher.email,
      from,
      subject: "⛔️ Урок отменен",
      html: baseTemplateEmail(
        "⛔️ Урок отменен",
        infoForTeacher(lesson, teacher)
      ),
    });
  }
};
