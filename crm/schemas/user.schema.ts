import { graphql, list } from '@keystone-6/core';
import { password, relationship, select, text, virtual } from '@keystone-6/core/fields';
import { RolesValues } from '../consts/roles.const';
import { Roles } from '../enums/roles.enum';
import { language } from '../fields/language';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { EditOnlyAdminForUi } from '../validation';
import { FRONTEND_URL } from '../config';
import { Lists } from '.keystone/types';

export const User = list({
    ui: {
        label: 'Клиенты',
        listView: {
            initialColumns: ['id', 'name', 'language', 'email', 'role'],
            initialSort: {
                field: 'id',
                direction: 'DESC'
            },
            pageSize: 20
        },
        searchFields: ['name', 'email']
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
                inlineCreate: { fields: ['image'] }
            }
        }),
        // @ts-ignore
        linkForUser: virtual<Lists.User.TypeInfo>({
            label: 'Ссылка в личный кабинет',
            field: graphql.field({
                type: graphql.String,
                resolve: (item) => `${FRONTEND_URL}/${item.language}/profile?setEmail=${item.email}`
            })
        }),
        name: text({ label: 'Имя, фамилия' }),
        email: text({
            isIndexed: 'unique',
            isFilterable: true,
            validation: { isRequired: true },
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi }
            }
        }),
        password: password({
            label: 'Пароль',
            validation: { length: { min: 4 } },
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi }
            }
        }),
        role: select({
            label: 'Роль',
            type: 'enum',
            options: RolesValues,
            defaultValue: Roles.Student,
            ui: {
                itemView: { fieldMode: EditOnlyAdminForUi }
            }
        }),
        client: relationship({
            ref: 'Client',
            label: 'Лид',
            ui: {
                displayMode: 'cards',
                cardFields: ['statusClient', 'phone', 'levelStudent', 'profession', 'goal', 'teachers', 'comment'],
                inlineEdit: {
                    fields: ['statusClient', 'phone', 'levelStudent', 'profession', 'goal', 'teachers', 'comment']
                },
                linkToItem: true,
                removeMode: 'none'
            }
        }),
        manager: relationship({
            ref: 'Manager',
            label: 'Работник',
            ui: { itemView: { fieldMode: EditOnlyAdminForUi } }
        }),
        cart: relationship({
            ref: 'Cart.user',
            label: 'Корзина',
            ui: { itemView: { fieldMode: EditOnlyAdminForUi }, removeMode: 'none' }
        }),
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
