import { UseFormGetValues } from 'react-hook-form/dist/types/form';
import { WorKCalendarForm } from '../types';
import { WorkTimeCreateInput, WorkTimeUpdateArgs } from '@src/shared/lib/apollo/types';

/**
 * Удаляем у выходных дней время работы
 * @param data
 * @param id
 */
export const formatSchedule = (data: WorKCalendarForm, id: string): WorkTimeCreateInput[] =>
    data.workTime.map((item) => {
        const workTime = item.isDayOff ? { ...item, startTime: '', endTime: '' } : item;
        return { ...workTime, manager: { connect: { id } } };
    });

export const hiddenField = (getValues: UseFormGetValues<WorKCalendarForm>, index: number): boolean => {
    return getValues().workTime[index].isDayOff || false;
};

export const formatUpdateSchedule = (data: WorKCalendarForm, id: string): WorkTimeUpdateArgs[] => {
    return data.workTime.map((item) => {
        const workTime = item.isDayOff ? { ...item, startTime: '', endTime: '' } : item;
        return {
            data: { ...workTime, manager: { connect: { id } }, id: undefined, __typename: undefined },
            where: { id: item.id }
        };
    });
};
