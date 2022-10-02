import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { Lists } from ".keystone/types";
import { format } from "date-fns-tz";
import { localeDate } from "../lib/localeDate";
import { mailer } from "../lib/nodemailer";
import { from } from "./index";
import { baseTemplateEmail } from "../mailTemplate/base";
import { templateLesson } from "../mailTemplate/templateLesson";
import { FRONTEND_URL } from "../config";

const infoForStudent = (lesson: any) => {
  const dateFormat = format(
    new Date(lesson.startTime),
    "d MMMM yyyy HH:mm zzz",
    {
      timeZone: lesson.timeZone,
      locale: localeDate("ru"),
    }
  );

  return `
      <div style='display:flex; flex-direction: column;'>
          <p>✅ Вы записались на обучение: ${lesson.subscription.name}</p>
          <p>Дата: ${dateFormat}, ${lesson.timeZone}</p>
          <p>Ссылка на онлайн урок: ${lesson.teachers[0].linkOnlineLesson}</p>
      </div>
    `;
};

const infoForTeacher = (lesson: any) => {
  const dateFormatStart = format(
    new Date(lesson.startTime),
    "d MMMM yyyy HH:mm zzz",
    {
      timeZone: lesson.timeZone,
      locale: localeDate("ru"),
    }
  );

  const dateFormatEnd = format(
    new Date(lesson.startTime),
    "d MMMM yyyy HH:mm zzz",
    {
      timeZone: lesson.timeZone,
      locale: localeDate("ru"),
    }
  );

  const studentsName = lesson.students.map(
    (student: Lists.User.Item) => student.name
  );

  return `
      <div style='display:flex; flex-direction: column;'>
          <p>К вам записался ученик: ${studentsName.join(", ")}</p>
          <p>Начало: ${dateFormatStart}, ${lesson.timeZone}</p>
          <p>Конец: ${dateFormatEnd}, ${lesson.timeZone}</p>
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
  const studentsEmail = lesson.students.map(
    (user: Lists.User.Item) => user.email
  );

  await mailer.sendMail({
    to: studentsEmail,
    from,
    subject: "🧑🏼‍🏫 Запись на урок",
    html: templateLesson(
      "🧑🏼‍🏫 Запись на урок",
      infoForStudent(lesson),
      `${FRONTEND_URL}/api/student/${lesson.students[0].id}/lessons.ical`
    ),
  });

  const teachersEmail = lesson.teachers.map(
    (user: Lists.Manager.Item) => user.email
  );

  await mailer.sendMail({
    to: teachersEmail,
    from,
    subject: "Новый урок",
    html: baseTemplateEmail("Новый урок", infoForTeacher(lesson)),
  });
};
