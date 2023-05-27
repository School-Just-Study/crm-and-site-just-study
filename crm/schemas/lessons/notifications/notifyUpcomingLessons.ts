import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { Lists } from '.keystone/types';
import { formatInTimeZone } from 'date-fns-tz';
import { localeDate } from '../../../lib/localeDate';
import { sendMessage } from '../../../notifications';
import { BACKEND_URL } from '../../../config';

const infoForStudent = (lesson: any, student: Lists.User.Item) => {
    const dateFormat = formatInTimeZone(new Date(lesson.startTime), lesson.timeZone, 'd MMMM yyyy HH:mm zzz', {
        locale: localeDate('ru')
    });

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
export const notifyUpcomingLessons = async (lessonId: Lists.Lesson.Item['id'], ctx: KeystoneContext) => {
    const lesson = await ctx.query.Lesson.findOne({
        where: { id: `${lessonId}` },
        query: `id statusLesson startTime endTime teachers { id email name language linkOnlineLesson timeZone } students { id name email } timeZone subscription { name }`
    });

    for (const user of lesson.students) {
        await sendMessage({
            email: user.email,
            title: '🔔 Напоминание о занятии',
            body: infoForStudent(lesson, user),
            template: 'lesson',
            link: `${BACKEND_URL}/api/student/${user.id}/lessons.ical`
        }).then(async () => {
            await ctx.query.Lesson.updateOne({
                where: { id: `${lessonId}` },
                data: { notified: true }
            });
        });
    }
};
