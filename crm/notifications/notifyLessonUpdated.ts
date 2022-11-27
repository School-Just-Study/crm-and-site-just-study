import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { Lists } from '.keystone/types';
import { formatInTimeZone } from 'date-fns-tz';
import { localeDate } from '../lib/localeDate';
import { sendMessage } from './index';

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
          <p>🧑🏼‍🏫 ${teacher.name},</p>
          <p>🦄 Обновлена информация об уроке с учеником: ${studentsName.join(', ')} </p>
          <p>⏰ Начало: ${dateFormatStart}, ${teacher.timeZone}</p>
          <p>⏰ Конец: ${dateFormatEnd}, ${teacher.timeZone}</p>
      </div>
    `;
};

/**
 * Уведомление об обновлении урока
 * @param lessonId
 * @param ctx
 */
export const notifyLessonUpdated = async (lessonId: Lists.Lesson.Item['id'], ctx: KeystoneContext) => {
    const lesson = await ctx.query.Lesson.findOne({
        where: { id: `${lessonId}` },
        query: `id statusLesson startTime endTime teachers { id email name language timeZone } students { id name email }`
    });

    for (const teacher of lesson.teachers) {
        await sendMessage({
            email: teacher.email,
            title: '🦄 Урок перезаписан',
            body: infoForTeacher(lesson, teacher)
        });
    }
};
