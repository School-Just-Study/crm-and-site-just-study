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
          <p>✅ Вы записались на обучение: ${lesson.subscription.name}</p>
          <p>⏰ Дата: ${dateFormat}, ${lesson.timeZone}</p>
          <p>🏫 Ссылка на онлайн урок: ${lesson.teachers[0].linkOnlineLesson}</p>
      </div>
    `;
};

const infoForTeacher = (lesson: any, teacher: Lists.Manager.Item) => {
  const dateFormatStart = formatInTimeZone(
    new Date(lesson.startTime),
    teacher.timeZone,
    "d MMMM yyyy HH:mm zzz",
    {
      locale: localeDate(teacher.language),
    }
  );

  const dateFormatEnd = formatInTimeZone(
    new Date(lesson.endTime),
    teacher.timeZone,
    "d MMMM yyyy HH:mm zzz",
    {
      locale: localeDate(teacher.language),
    }
  );

  const studentsName = lesson.students.map(
    (student: Lists.User.Item) => student.name
  );

  return `
      <div style='display:flex; flex-direction: column;'>
          <p>${teacher.name}</p>
          <p>К вам записался ученик: ${studentsName.join(", ")}</p>
          <p>⏰ Начало: ${dateFormatStart}, ${teacher.timeZone}</p>
          <p>⏰ Конец: ${dateFormatEnd}, ${teacher.timeZone}</p>
      </div>
    `;
};

/**
 * Уведомление о создании урока
 * @param lessonId
 * @param ctx
 */
export const notifyNewLesson = async (
  lessonId: Lists.Lesson.Item["id"],
  ctx: KeystoneContext
) => {
  const lesson = await ctx.query.Lesson.findOne({
    where: { id: `${lessonId}` },
    query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone subscription { name }`,
  });

  for (const user of lesson.students) {
    await mailer.sendMail({
      to: user.email,
      from,
      subject: "🧑🏼‍🏫 Запись на урок",
      html: templateLesson(
        "🧑🏼‍🏫 Запись на урок",
        infoForStudent(lesson, user),
        `${BACKEND_URL}/api/student/${user.id}/lessons.ical`
      ),
    });
  }

  for (const teacher of lesson.teachers) {
    await mailer.sendMail({
      to: teacher.email,
      from,
      subject: "✅ Новый урок",
      html: templateLesson(
        "✅ Новый урок",
        infoForTeacher(lesson, teacher),
        `${BACKEND_URL}/api/teacher/${teacher.id}/lessons.ical`
      ),
    });
  }
};
