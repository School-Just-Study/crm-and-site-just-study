import { list } from '@keystone-6/core';
import { select, text } from '@keystone-6/core/fields';
import { DayOfWeekOptionsConst } from '../../../../consts/dayOfWeek-options.const';
import { createdAt } from '../../../../fields/createdAt';
import { lastModification } from '../../../../fields/lastModification';
import { allowAll } from '@keystone-6/core/access';
import { timeRules } from './rules';

export const LessonScheduleItem = list({
    ui: {
        isHidden: true
    },
    fields: {
        dayOfWeek: select({
            type: 'integer',
            options: DayOfWeekOptionsConst,
            validation: { isRequired: true },
            label: 'День недели'
        }),
        startTime: text({
            label: 'Начало урока',
            ...timeRules
        }),
        endTime: text({
            label: 'Окончание урока',
            ...timeRules
        }),
        createdAt,
        lastModification
    },
    access: allowAll
});
