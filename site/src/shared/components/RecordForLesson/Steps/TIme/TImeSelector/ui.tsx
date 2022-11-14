import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';
import { useRouter } from 'next/router';
import { localeDate } from '@src/shared/lib/localeDate';
import { getExcludeTimes } from '../utils';
import { Alert } from '@mui/material';
import { BoxTimeSelector } from './styles';
import { TimeSelectorProps } from './types';
import { TimeZone } from '@shared/components/RecordForLesson/TimeZone';
import { addMinutes } from 'date-fns';
import { filterTime } from '@shared/components/RecordForLesson/Steps/TIme/TImeSelector/utils';
import { useUnit } from 'effector-react';
import { $maxTimeForRecord } from './model';

export const TimeSelector: FC<TimeSelectorProps> = ({
    startTime,
    endTime,
    unavailableTimesForRecordLesson,
    noFilter
}) => {
    const { setValue, watch } = useFormContext<LessonForm>();
    const [excludeTimes, setExcludeTimes] = useState<Date[] | undefined>(undefined);
    const [countTimeVariant, setCountTimeVariant] = useState(0);
    watch();
    const [selected, setSelected] = useState(watch('date'));
    const maxTimeRecord = useUnit($maxTimeForRecord);

    useEffect(() => {
        if (unavailableTimesForRecordLesson) {
            const cutoff = getExcludeTimes(unavailableTimesForRecordLesson, watch('date'));
            setExcludeTimes(cutoff);
        }
    }, [unavailableTimesForRecordLesson]);

    useEffect(() => {
        setCountTimeVariant(
            document.querySelectorAll(
                '.react-datepicker__time-list-item:not(.react-datepicker__time-list-item--disabled)'
            ).length
        );
    }, [watch()]);

    const { locale } = useRouter();
    const localeForDate = localeDate(locale || 'en');

    const onChange: ReactDatePickerProps['onChange'] = (time) => {
        if (time) {
            setSelected(time);
            setValue('startTime', time);
        }
    };

    return (
        <>
            {countTimeVariant === 0 ? (
                <Alert severity="warning">К сожалению, свободного времени нет. Пожалуйста, выберите другую дату.</Alert>
            ) : (
                <TimeZone />
            )}
            <BoxTimeSelector>
                <DatePicker
                    selected={selected}
                    onChange={onChange}
                    locale={localeForDate}
                    inline
                    showTimeSelect
                    showTimeSelectOnly
                    calendarClassName="calendarClassName"
                    timeIntervals={60}
                    dateFormat="HH:mm"
                    minTime={new Date(startTime)}
                    maxTime={addMinutes(new Date(endTime), maxTimeRecord)}
                    excludeTimes={excludeTimes}
                    filterTime={noFilter ? undefined : filterTime}
                />
            </BoxTimeSelector>
        </>
    );
};
