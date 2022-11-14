import { timeStringToNumber } from '@shared/dateTime';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { UseFormReturn } from 'react-hook-form/dist/types/form';

import { WorKCalendarForm } from '../types';

export function beginTimeRules(
    getValues: UseFormReturn<WorKCalendarForm>['getValues'],
    index: number
): UseControllerProps['rules'] {
    const isHoliday = getValues().workTime[index].isDayOff;

    return {
        validate: {
            required: (value) => {
                if (!isHoliday) {
                    return value !== undefined || 'Введите время';
                }
            }
        }
    };
}

export function endTimeRules(
    getValues: UseFormReturn<WorKCalendarForm>['getValues'],
    index: number
): UseControllerProps['rules'] {
    const isHoliday = getValues().workTime[index].isDayOff;

    return {
        validate: {
            required: (value) => {
                if (!isHoliday) {
                    return value !== undefined || 'Введите время';
                }
            },
            time: (v) => {
                if (!isHoliday) {
                    return (
                        timeStringToNumber(v) > timeStringToNumber(getValues().workTime[index].startTime as string) ||
                        'Неправильный период'
                    );
                }
            }
        }
    };
}
