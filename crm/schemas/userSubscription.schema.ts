import { graphql, list } from '@keystone-6/core';
import {
    checkbox,
    integer,
    multiselect,
    relationship,
    select,
    text,
    timestamp,
    virtual
} from '@keystone-6/core/fields';
import { Roles } from '../enums/roles.enum';
import { StatusesOptions } from '../consts/statuses-options.const';
import { Statuses } from '../enums/statuses.enum';
import { Lists } from '.keystone/types';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { LessonStatus } from '../enums/lesson-status';
import { FRONTEND_URL } from '../config';
import { EditOnlyAdminForUi } from '../validation';
import { durationLessonsOptionConst } from '../consts/duration-lessons-option.const';
import { DurationLessons } from '../enums/duration-lessons.enum';
import { handleCreateUserSubscriptionsAfterOrderPayments } from '../lib/handleUpdateClientStatusAfterActiveSubscription';

export const UserSubscription = list({
    ui: {
        label: '🫶🏻Студенты: абонементы',
        labelField: 'name',
        listView: {
            initialColumns: [
                'id',
                'name',
                'visitCount',
                'price',
                'status',
                'student',
                'beginDate',
                'endDate',
                'lastCount'
            ],
            initialSort: { field: 'status', direction: 'ASC' }
        },
        searchFields: ['name']
    },
    fields: {
        name: text({ label: 'Название' }),
        linkForUser: virtual({
            label: 'Ссылка для записи на урок',
            // @ts-ignore
            field: graphql.field({
                type: graphql.String,
                async resolve(item: Lists.UserSubscription.Item, arg, context) {
                    const user = await context.query.User.findOne({
                        where: { id: `${item.studentId}` },
                        query: 'email language'
                    });
                    return `${FRONTEND_URL}/${user.language}/profile/student?setEmail=${user.email}`;
                }
            })
        }),
        visitCount: integer({ label: 'Количество занятий' }),
        unlimited: checkbox({
            defaultValue: false,
            label: 'Безлимитное количество занятий'
        }),
        originalPrice: integer({
            label: 'Оригинальная цена',
            ui: {
                itemView: { fieldMode: 'read' }
            }
        }),
        price: integer({
            label: 'Цена продажи',
            ui: {
                itemView: { fieldMode: 'read' }
            }
        }),
        status: select({
            options: StatusesOptions,
            ui: { displayMode: 'segmented-control' },
            defaultValue: Statuses.Inactive,
            validation: { isRequired: true },
            label: 'Статус абонемента'
        }),
        student: relationship({ ref: 'User', label: 'Клиенты', ui: { itemView: { fieldMode: EditOnlyAdminForUi } } }),
        beginDate: timestamp({
            defaultValue: { kind: 'now' },
            label: 'Дата начала'
        }),
        endDate: timestamp({ label: 'Дата окончания' }),
        totalVisited: virtual({
            label: 'Посещено занятий',
            // @ts-ignore
            field: graphql.field({
                type: graphql.Int,
                async resolve(item: Lists.UserSubscription.Item, arg, ctx) {
                    if (item.visitCount) {
                        const lessons = await ctx.query.Lesson.findMany({
                            where: {
                                statusLesson: { equals: LessonStatus.Completed },
                                subscription: { id: { equals: item.id } }
                            }
                        });
                        return lessons.length;
                    } else {
                        return;
                    }
                }
            })
        }),
        customVisited: integer({
            defaultValue: 0,
            ui: { description: 'Вручную указать сколько занятий было посещено' }
        }),
        lastCount: virtual({
            label: 'Осталось занятий',
            // @ts-ignore
            field: graphql.field({
                type: graphql.Int,
                async resolve(item: Lists.UserSubscription.Item, arg, ctx) {
                    if (item.visitCount) {
                        const lesson = await ctx.query.UserSubscription.findOne({
                            where: {
                                id: `${item.id}`
                            },
                            query: `totalVisited customVisited`
                        });
                        return item.visitCount - lesson.totalVisited - lesson.customVisited;
                    } else {
                        return;
                    }
                }
            })
        }),
        lessons: relationship({
            ref: 'Lesson.subscription',
            many: true,
            label: 'Уроки'
        }),
        trial: checkbox({
            defaultValue: false,
            label: 'Пробный урок'
        }),
        durationLessons: multiselect({
            type: 'integer',
            options: durationLessonsOptionConst,
            label: 'Длительность занятий',
            defaultValue: [DurationLessons.M]
        }),
        manager: relationship({ ref: 'User' }),
        createdAt,
        lastModification
    },
    hooks: {
        afterOperation: handleCreateUserSubscriptionsAfterOrderPayments
    },
    access: {
        operation: {
            delete: ({ session }) => !!session && session.data.role !== Roles.Student,
            query: () => true,
            create: () => true,
            update: () => true
        }
    }
});
