import { sample } from 'effector';
import { $schedule, $scheduleParams, againGetScheduleParams, setScheduleParams } from './model';
import { getScheduleFx } from './effects';
import { $user } from '@shared/storage/user';

sample({
    clock: setScheduleParams,
    source: $user,
    filter: (data) => Boolean(data?.manager?.id),
    fn: (user, data) => ({ ...data, teacherId: user?.manager?.id }),
    target: getScheduleFx
});

sample({
    clock: againGetScheduleParams,
    source: { $scheduleParams, $user },
    filter: (data) => Boolean(data.$user?.manager?.id),
    fn: (data) => ({ ...data.$scheduleParams, teacherId: data.$user?.manager?.id }),
    target: getScheduleFx
});

sample({
    clock: getScheduleFx.doneData,
    fn: ({ data }) => {
        return data.getTeacherSchedule;
    },
    target: $schedule
});
