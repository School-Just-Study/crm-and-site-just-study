import { sample } from "effector";
import { $schedule, $scheduleParams, againGetScheduleParams, setScheduleParams } from "./model";
import { getScheduleFx } from "@src/pages/Profile/TeacherCabinet/Schedule/model/effects";

sample({
    clock: setScheduleParams,
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
