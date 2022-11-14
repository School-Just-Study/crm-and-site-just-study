import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { Roles } from '../enums/roles.enum';
import format from 'date-fns/format';
import { Lists } from '.keystone/types';
import { fieldsEmail } from '../lib/fieldsEmail';
import { sendMessage } from './index';

/**
 * Уведомление для менеджера о новом лиде
 * @param client
 * @param ctx
 */
export const notifyNewClient = async (
    client: Lists.Client.Item,
    ctx: KeystoneContext
) => {
    const managers = await ctx.query.User.findMany({
        where: { role: { in: [Roles.Admin, Roles.Manager] } },
        query: `email`
    });

    const managersEmail = managers.map((user) => user.email) as string[];

    const clientInfo = `
    <div style='display:flex; flex-direction: column'>
    ${fieldsEmail('Имя', client.name)}
    ${fieldsEmail('Телефон', `${client.phone}`)}
    ${fieldsEmail(
        'Дата',
        `${format(
            new Date(client.createdAt as unknown as string),
            'dd.MM.yyyy HH:mm'
        )}`
    )}
    ${fieldsEmail('Email', client.email)}
    ${fieldsEmail('Коммент', client.comment)}
</div>
  `;

    await sendMessage({
        email: managersEmail,
        title: '🐥 Новый лид',
        body: clientInfo
    });
};
