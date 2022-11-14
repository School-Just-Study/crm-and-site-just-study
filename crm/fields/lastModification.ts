import { timestamp } from '@keystone-6/core/fields';

export const lastModification = timestamp({
    defaultValue: { kind: 'now' },
    ui: { createView: { fieldMode: 'hidden' }, itemView: { fieldMode: 'read' } },
    db: {
        updatedAt: true
    },
    validation: { isRequired: true },
    label: 'Дата обновления'
});
