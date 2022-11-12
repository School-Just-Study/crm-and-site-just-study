import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { statusView } from '../fields/statusView';
import { handleNotificationManagerNewReview } from '../lib/handleNotificationManagerNewReview';

export const ProductReview = list({
    ui: {
        label: 'Отзывы студентов',
        listView: {
            initialColumns: ['id', 'student', 'statusView', 'products', 'desc'],
            pageSize: 20
        },
        searchFields: ['desc']
    },
    fields: {
        language,
        statusView,
        student: relationship({ ref: 'User', label: 'Клиент' }),
        products: relationship({ ref: 'Product', many: true, label: 'Курсы' }),
        desc: text({
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Описание'
        }),
        media: text({ label: 'Видео' }),
        createdAt,
        lastModification
    },
    hooks: { afterOperation: handleNotificationManagerNewReview },
    access: {
        operation: {
            update: ({ session }) => !!session && session.data.role !== Roles.Student,
            delete: ({ session }) => !!session && session.data.role !== Roles.Student,
            query: () => true,
            create: () => true
        }
    }
});
