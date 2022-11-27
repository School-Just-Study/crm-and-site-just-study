import { graphql, list } from '@keystone-6/core';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { image, text, virtual } from '@keystone-6/core/fields';
import { statusView } from '../fields/statusView';
import { checkboxField } from '../fields/checkbox';
import { ViewStatus } from '../enums/view-status.enum';
import { FRONTEND_URL } from '../config';
import { Lists } from '.keystone/types';

export const Marketing = list({
    ui: {
        label: '📈Лендинги',
        labelField: 'title',
        listView: {
            initialColumns: ['language', 'title', 'statusView', 'slug', 'description']
        }
    },
    fields: {
        language,
        statusView,
        link: virtual({
            label: 'Ссылка на лендинг',
            // @ts-ignore
            field: graphql.field({
                type: graphql.String,
                resolve(item: Lists.Marketing.Item) {
                    if (item.statusView === ViewStatus.Show) {
                        return `${FRONTEND_URL}/${item.language}/marketing/${item.slug}`;
                    }
                    return 'Ссылка не доступна до публикации';
                }
            })
        }),
        slug: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            label: 'Путь для лендинга'
        }),
        image: image({ storage: 'storage_marketing_image', label: 'Аватарка' }),
        title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
        description: text({
            ui: {
                displayMode: 'textarea'
            },
            db: { nativeType: 'VarChar(10000)' },
            label: 'Выделенный текст сверху страницы'
        }),
        aboutGeorge: checkboxField('Об основателе'),
        advantages: checkboxField('Чем мы отличаемся?'),
        reviews: checkboxField('Отзывы учеников'),
        createdAt,
        lastModification
    },
    access: {
        operation: {
            create: ({ session }) => !!session,
            update: ({ session }) => !!session,
            delete: ({ session }) => !!session,
            query: () => true
        }
    }
});
