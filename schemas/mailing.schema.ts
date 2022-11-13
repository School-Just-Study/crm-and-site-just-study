import { list } from '@keystone-6/core';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { multiselect, relationship, select, text } from '@keystone-6/core/fields';
import { MailingStatusOptions } from '../consts/mailing-status-options.const';
import { MailingStatus } from '../enums/mailing-status.enum';
import { ClientStatusOptionsConst } from '../consts/client-status-options.const';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { handleMailerSending } from '../lib/handleMailerSending';
import { document } from '@keystone-6/fields-document';

export const Mailing = list({
    ui: {
        label: 'Рассылки',
        listView: {
            initialColumns: [
                'id',
                'status',
                'content',
                'statusClient',
                'clients'
            ],
            initialSort: {
                field: 'status',
                direction: 'ASC'
            },
            pageSize: 20
        },
        searchFields: ['status']
    },
    fields: {
        language,
        status: select({
            options: MailingStatusOptions,
            defaultValue: MailingStatus.Draft,
            ui: {
                displayMode: 'segmented-control',
                description: `В режиме "Отправка" рассылка будет отправлена получателям`
            },
            validation: { isRequired: true },
            label: 'Статус'
        }),
        clients: relationship({ ref: 'User', label: 'Отправить клиентам', many: true }),
        statusClient: multiselect({
            type: 'enum',
            options: ClientStatusOptionsConst,
            label: 'Отправить клиентам со статусами'
        }),
        title: text({ label: 'Заголовок', validation: { isRequired: true } }),
        content: document({
            formatting: true,
            dividers: true,
            links: true,
            label: 'Содержимое письма'
        }),
        createdAt,
        lastModification
    },
    hooks: { afterOperation: handleMailerSending },
    access: {
        operation: {
            create: ({ session }) => !!session && session.data.role !== Roles.Student,
            update: ({ session }) => !!session && session.data.role !== Roles.Student,
            delete: ({ session }) => !!session && session.data.role !== Roles.Student,
            query: () => true
        }
    }
});
