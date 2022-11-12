import { timestamp } from '@keystone-6/core/fields';

export const createdAt = timestamp({
    defaultValue: { kind: 'now' },
    ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'read' } },
    validation: { isRequired: true },
    label: 'Дата создания'
});
