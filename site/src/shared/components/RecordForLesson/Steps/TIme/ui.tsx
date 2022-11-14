import { Alert, StepContent, StepLabel, Typography } from '@mui/material';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { Buttons } from '@shared/components/RecordForLesson/Buttons';
import { useRouter } from 'next/router';
import { localeDate } from '@src/shared/lib/localeDate';
import { format } from 'date-fns';
import { nextActiveStep } from '@shared/components/RecordForLesson/model/model';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';
import { getScheduleToday } from '@shared/components/RecordForLesson/Steps/TIme/utils';
import { GetScheduleToday, TimeProps } from '@shared/components/RecordForLesson/Steps/TIme/types';
import { UnavailableTimesRes } from './TImeSelector/types';
import { QUERY_GET_UNAVAILABLE_TIMES } from './TImeSelector/query';
import { TimeSelector } from './TImeSelector';
import client from '@src/shared/lib/apollo/apolloClient';
import { UnavailableTimesForRecordLessonResponse } from '@src/shared/lib/apollo/types';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';

export const Time: FC<TimeProps> = ({ noFilter }) => {
    const { watch } = useFormContext<LessonForm>();
    const [borderTime, setBorderTime] = useState<GetScheduleToday | undefined>(undefined);
    watch();
    // @ts-ignore
    const time = watch('startTime');
    const { locale } = useRouter();
    const localeForDate = localeDate(locale || 'en');
    const formatTimeSelect = time && format(time, 'H:mm', { locale: localeForDate });
    const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTimesForRecordLessonResponse[] | undefined>(
        undefined
    );
    const [unavailableTimesLoading, setUnavailableTimesLoading] = useState(false);

    useEffect(() => {
        if (time) nextActiveStep();
    }, [time]);

    useEffect(() => {
        if (watch('teacher') && watch('date')) {
            const times = getScheduleToday(
                watch('teacher').workTime,
                watch('date'),
                watch('teacher').timeZone as string
            );
            if (times) {
                setBorderTime(times);
            }
            setUnavailableTimesLoading(true);
            const dateWithoutTime = format(watch('date'), 'yyyy-MM-dd');
            client
                .query<UnavailableTimesRes>({
                    query: QUERY_GET_UNAVAILABLE_TIMES,
                    variables: { data: { date: dateWithoutTime, teacherId: watch('teacher')?.id } }
                })
                .then((res) => setUnavailableTimes(res.data.unavailableTimesForRecordLesson))
                .finally(() => setUnavailableTimesLoading(false));
        }
    }, [watch('date', 'teacher')]);

    return (
        <>
            <StepLabel optional={time && formatTimeSelect}>
                <Typography fontWeight="bold">Время</Typography>
            </StepLabel>
            <StepContent>
                <SpinnerWrapper loading={unavailableTimesLoading}>
                    {borderTime && borderTime.isDayOff ? (
                        <Alert severity="warning">
                            К сожалению, свободного времени нет. Пожалуйста, выберите другую дату.
                        </Alert>
                    ) : (
                        <TimeSelector
                            startTime={borderTime?.startTime as string}
                            endTime={borderTime?.endTime as string}
                            unavailableTimesForRecordLesson={unavailableTimes}
                            noFilter={noFilter}
                        />
                    )}
                </SpinnerWrapper>
                <Buttons disableNext={!time} />
            </StepContent>
        </>
    );
};
