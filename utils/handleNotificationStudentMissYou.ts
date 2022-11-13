import { ServerConfig } from '@keystone-6/core/types';
import { Statuses } from '../enums/statuses.enum';
import { LessonStatus } from '../enums/lesson-status';
import { sendMessage } from '../notifications';

/**
 * Напоминалка для ученика, что он не записан
 * Скрипт запускается по cron каждые 10 мин
 * @param app
 * @param createContext
 */
export const handleNotificationStudentMissYou: ServerConfig<any>['extendExpressApp'] =
    async (app, createContext) => {
        app.get('/api/check-records', async (req, res) => {
            const context = await createContext(req, res);
            console.info(new Date(), 'check records');

            const userSubscription = await context.query.UserSubscription.findMany({
                where: {
                    status: { equals: Statuses.Active },
                    lessons: { none: { statusLesson: { equals: LessonStatus.Created } } }
                },
                query: `student { name email }`
            });

            for (const subscription of userSubscription) {
                const linkReview = `https://edu.juststudy.online/my/`;
                const name = subscription.student?.name?.split(' ') || ' ';

                const message = `
                      <p>Вы ещё не записались на уроки 🇬🇧 на следующую неделю!</p>
                      <p>Лайфхак №1 для эффективного изучения иностранного языка - регулярность. Гораздо лучше заниматься каждый день по 30 минут, чем 1 раз в неделю сидеть целый день и попытаться запомнить все и сразу! (доказано учеными) 😉</p>
                      <p>Запишитесь на урок в удобное время ➡️</p>
                      <div style='border: none; border-radius: 3px; cursor: auto; mso-padding-alt: 10px 25px; background: #0c51c4; max-width: 250px' role='presentation' align='center' valign='middle' bgcolor='#0c51c4'><a style='display: inline-block; background: #0c51c4; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: normal; line-height: 120%; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;' href='${linkReview}' target='_blank'> Записаться на платформе </a></div>
                  `;

                await sendMessage({
                    email: subscription.student.email,
                    title: `👋 Hey there, ${name[0]}!`,
                    body: message
                });
            }
            res.sendStatus(200);
        });
    };
