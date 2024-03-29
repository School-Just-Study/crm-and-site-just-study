import { LessonUpdateInput, Lists } from '.keystone/types';
import { formatInTimeZone } from 'date-fns-tz';
import { localeDate } from '../../../lib/localeDate';
import { sendMessage } from '../../../notifications';
import { KeystoneContextFromListTypeInfo } from '@keystone-6/core/types';

const infoForTeacher = (
    lesson: any,
    teacher: Lists.Manager.Item,
    startTime: LessonUpdateInput['startTime'],
    endTime: LessonUpdateInput['endTime']
) => {
    const dateFormatStart = formatInTimeZone(new Date(startTime), teacher.timeZone, 'd MMMM yyyy HH:mm zzz', {
        locale: localeDate(teacher.language)
    });

    const dateFormatEnd = formatInTimeZone(new Date(endTime), teacher.timeZone, 'd MMMM yyyy HH:mm zzz', {
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
export const notifyLessonUpdated = async (
    lessonId: Lists.Lesson.Item['id'],
    ctx: KeystoneContextFromListTypeInfo<any>,
    startTime: LessonUpdateInput['startTime'],
    endTime: LessonUpdateInput['endTime']
) => {
    const lesson = await ctx.query.Lesson.findOne({
        where: { id: `${lessonId}` },
        query: `id statusLesson teachers { id email name language timeZone } students { id name email }`
    });

    for (const teacher of lesson.teachers) {
        await sendMessage({
            email: teacher.email,
            title: '🦄 Урок перезаписан',
            body: infoForTeacher(lesson, teacher, startTime, endTime)
        });
    }
};
