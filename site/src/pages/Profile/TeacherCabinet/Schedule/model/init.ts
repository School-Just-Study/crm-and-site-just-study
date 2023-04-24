import { sample } from 'effector';
import { $schedule, $scheduleParams, againGetScheduleParams, setScheduleParams } from './model';
import { getScheduleFx } from './effects';
import { $user } from '@shared/storage/user';

sample({
    clock: setScheduleParams,
    source: $user,
    filter: (data) => Boolean(data?.id),
    fn: (user, data) => ({ teacherId: user?.manager?.id, ...data }),
    target: getScheduleFx
});

sample({
    clock: againGetScheduleParams,
    source: $scheduleParams,
    filter: (data) => Boolean(data),
    target: getScheduleFx
});

sample({
    clock: getScheduleFx.doneData,
    fn: ({ data }) => {
        return data.getTeacherSchedule;
    },
    target: $schedule
});
