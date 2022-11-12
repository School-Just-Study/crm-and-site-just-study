import { list } from '@keystone-6/core';
import { password, relationship, select, text } from '@keystone-6/core/fields';
import { RolesValues } from '../consts/roles.const';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';

export const User = list({
    ui: {
        label: 'Клиенты',
        listView: {
            initialColumns: ['id', 'name', 'language', 'email', 'role', 'comment'],
            initialSort: {
                field: 'createdAt',
                direction: 'DESC'
            },
            pageSize: 20
        },
        searchFields: ['name', 'email', 'comment']
    },
    fields: {
        language,
        avatar: relationship({
            label: 'Аватар',
            ref: 'AvatarUser.user',
            many: false,
            ui: {
                displayMode: 'cards',
                cardFields: ['image'],
                inlineEdit: { fields: ['image'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['image'] }
            }
        }),
        name: text({ label: 'Имя, фамилия' }),
        email: text({
            isIndexed: 'unique',
            isFilterable: true,
            validation: { isRequired: true }
        }),
        password: password({
            label: 'Пароль',
            validation: { length: { min: 4 } }
        }),
        role: select({
            label: 'Роль',
            type: 'enum',
            options: RolesValues,
            defaultValue: Roles.Student
        }),
        comment: text({
            label: 'Комментарий',
            ui: { displayMode: 'textarea' },
            db: { nativeType: 'VarChar(10000)' }
        }),
        client: relationship({ ref: 'Client', label: 'Лид' }),
        manager: relationship({ ref: 'Manager', label: 'Работник' }),
        cart: relationship({ ref: 'Cart.user', label: 'Корзина' }),
        magicLinkToken: text({
            ui: {
                listView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'hidden' },
                createView: { fieldMode: 'hidden' }
            }
        }),
        createdAt,
        lastModification
    },
    hooks: {
        afterOperation: async ({ operation, item, context }) => {
            if (operation !== 'create') {
                return;
            }
            const userId = item?.id;
            await context.prisma.cart.create({
                data: {
                    user: { connect: { id: userId } }
                }
            });
        }
    },
    access: {
        operation: {
            delete: ({ session }) => !!session,
            query: () => true,
            create: () => true,
            update: () => true
        }
    }
});
