import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { Lists } from '.keystone/types';
import { formatInTimeZone } from 'date-fns-tz';
import { localeDate } from '../../../lib/localeDate';
import { sendMessage } from '../../../notifications';
import { BACKEND_URL } from '../../../config';
import { UserSubscription } from '@src/src/shared/lib/apollo/types';

const infoForStudent = (lesson: any, student: Lists.User.Item) => {
    const dateFormat = formatInTimeZone(new Date(lesson.startTime), lesson.timeZone, 'd MMMM yyyy HH:mm zzz', {
        locale: localeDate('ru')
    });
    // @ts-ignore
    const subName = lesson.subscriptions?.find((sub: UserSubscription) => +sub?.student?.id == student.id)?.name;

    return `
      <div style='display:flex; flex-direction: column;'>
          <p>${student.name},</p>
          <p>✅ Вы записались на обучение: ${subName}</p>
          <p>⏰ Дата: ${dateFormat}, ${lesson.timeZone}</p>
          <p>🏫 Ссылка на онлайн урок: ${lesson.teachers[0].linkOnlineLesson}</p>
      </div>
    `;
};

const infoForTeacher = (lesson: any, teacher: Lists.Manager.Item) => {
    const dateFormatStart = formatInTimeZone(new Date(lesson.startTime), teacher.timeZone, 'd MMMM yyyy HH:mm zzz', {
        locale: localeDate(teacher.language)
    });

    const dateFormatEnd = formatInTimeZone(new Date(lesson.endTime), teacher.timeZone, 'd MMMM yyyy HH:mm zzz', {
        locale: localeDate(teacher.language)
    });

    const studentsName = lesson.students.map((student: Lists.User.Item) => student.name);

    return `
      <div style='display:flex; flex-direction: column;'>
          <p>${teacher.name}</p>
          <p>К вам записался ученик: ${studentsName.join(', ')}</p>
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
export const notifyNewLesson = async (lessonId: Lists.Lesson.Item['id'], ctx: KeystoneContext) => {
    const lesson = await ctx.query.Lesson.findOne({
        where: { id: `${lessonId}` },
        query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone subscriptions { name student { id } }`
    });

    for (const user of lesson.students) {
        await sendMessage({
            email: user.email,
            title: '🧑🏼‍🏫 Запись на урок',
            body: infoForStudent(lesson, user),
            template: 'lesson',
            link: `${BACKEND_URL}/api/student/${user.id}/lessons.ical`
        });
    }

    for (const teacher of lesson.teachers) {
        await sendMessage({
            email: teacher.email,
            title: '✅ Новый урок',
            body: infoForTeacher(lesson, teacher),
            template: 'lesson',
            link: `${BACKEND_URL}/api/teacher/${teacher.id}/lessons.ical`
        });
    }
};
