import { Lists } from '.keystone/types';
import { ListHooks } from '@keystone-6/core/types';
import { sendMessage } from '../notifications';
import { MailingStatus } from '../enums/mailing-status.enum';

export const handleMailerSending: ListHooks<Lists.Mailing.TypeInfo>['afterOperation'] =
    async ({ context, item, operation }) => {
        if (operation !== 'delete' && !item.shipped && item.status === MailingStatus.Sending) {
            const emails: string[] = [];

            const mailing = await context.query.Mailing.findOne({
                where: { id: `${item.id}` },
                query: `clients { email }`
            });

            if (mailing.clients.length) {
                const users = mailing.clients as Lists.User.Item[];
                users.forEach(({ email }) => emails.push(email));
            }

            // @ts-ignore
            if (item.statusClient.length) {
                const users = await context.query.Client.findMany({
                    where: { statusClient: { in: item.statusClient as [] } },
                    query: `email`
                });
                users.forEach(({ email }) => emails.push(email));
            }

            const emailForSending = new Set(emails);

            for (const email of emailForSending) {
                await sendMessage({
                    email: email,
                    title: item.title,
                    type: 'email',
                    content: item.content as unknown as JSON
                });
            }

            await context.query.Mailing.updateOne({
                where: { id: `${item.id}` },
                data: {
                    shipped: true
                }
            });
        }
    };
