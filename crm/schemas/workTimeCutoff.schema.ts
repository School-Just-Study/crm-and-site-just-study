import { graphql, list } from '@keystone-6/core';
import { relationship, text, timestamp, virtual } from '@keystone-6/core/fields';
import { createdAt } from '../fields/createdAt';
import { lastModification } from '../fields/lastModification';
import { statusView } from '../fields/statusView';
import { Lists } from '.keystone/types';
import format from 'date-fns/format';

export const WorkTimeCutoff = list({
    ui: {
        label: '👀Часы неработы',
        listView: {
            initialColumns: ['title', 'statusView', 'startTime', 'endTime', 'manager']
        }
    },
    db: {
        idField: { kind: 'uuid' }
    },
    fields: {
        label: virtual({
            // @ts-ignore
            field: graphql.field({
                type: graphql.String,
                resolve(item: Lists.WorkTimeCutoff.Item) {
                    if (!item) return;
                    return `${format(new Date(item.startTime), 'dd.MM.yyyy')} - ${format(
                        new Date(item.endTime),
                        'dd.MM.yyyy'
                    )}`;
                }
            })
        }),
        statusView,
        title: text(),
        uid: text({
            isFilterable: true,
            validation: { isRequired: true },
            defaultValue: 'manual',
            db: { isNullable: false }
        }),
        manager: relationship({ ref: 'Manager.cutoff', label: 'Учитель' }),
        startTime: timestamp({ validation: { isRequired: true }, label: 'Начало' }),
        endTime: timestamp({
            validation: { isRequired: true },
            label: 'Окончение'
        }),
        createdAt,
        lastModification
    },
    access: {
        operation: {
            query: () => true,
            create: () => true,
            update: () => true,
            delete: () => true
        }
    }
});
