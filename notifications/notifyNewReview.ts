import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { Roles } from '../enums/roles.enum';
import { baseTemplateEmail } from '../mailTemplate/base';
import { mailer } from '../lib/nodemailer';
import { Lists } from '.keystone/types';
import { fieldsEmail } from '../lib/fieldsEmail';
import { from } from './index';
import { BACKEND_URL } from '../config';

/**
 * Уведомление для менеджера о новом отзыве
 * @param review
 * @param ctx
 */
export const notifyNewReview = async (
  review: Lists.ProductReview.Item,
  ctx: KeystoneContext,
) => {
  const managers = await ctx.query.User.findMany({
    where: { role: { in: [Roles.Admin, Roles.Manager] } },
    query: `email`,
  });

  const student = await ctx.query.User.findOne({
    where: { id: `${review.studentId}` },
    query: `name`,
  });

  const managersEmail = managers.map((user) => user.email);

  const linkReview = `https://${BACKEND_URL}/product-reviews/${review.id}`;

  const clientInfo = `
    <div style='display:flex; flex-direction: column'>
      <p>👨🏻‍🎓 Студент ${student.name} оставил новый отзыв</p>
      <p>Содержание: 👇🏻</p>
      <p>${review.desc}</p>
      ${review.media && fieldsEmail('📱 Видео-отзыв', review.media)}
      <div style='border: none; border-radius: 3px; cursor: auto; mso-padding-alt: 10px 25px; background: #0c51c4; max-width: 250px' role='presentation' align='center' valign='middle' bgcolor='#0c51c4'><a style='display: inline-block; background: #0c51c4; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: normal; line-height: 120%; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;' href='${linkReview}' target='_blank'> Открыть отзыв </a></div>
    </div>
  `;

  await mailer.sendMail({
    to: managersEmail,
    from,
    subject: 'У вас новый отзыв',
    html: baseTemplateEmail('🤗 Новый отзыв', clientInfo),
  });
};
