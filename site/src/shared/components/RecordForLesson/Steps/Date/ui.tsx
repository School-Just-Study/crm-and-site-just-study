import { StepContent, StepLabel, Typography } from '@mui/material';
import * as React from 'react';
import { Buttons } from '@shared/components/RecordForLesson/Buttons';
import { CalendarPicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { localeDate } from '@src/shared/lib/localeDate';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';
import { shouldDisableDate } from '@shared/components/RecordForLesson/Steps/Date/utilis';
import { CalendarPickerProps } from '@mui/x-date-pickers/CalendarPicker/CalendarPicker';
import { addDays, format } from 'date-fns';
import { setActiveStep } from '@shared/components/RecordForLesson';

export const DateLesson = () => {
    const { getValues, setValue } = useFormContext<LessonForm>();
    // @ts-ignore
    const date = getValues('date');
    const { locale } = useRouter();
    // @ts-ignore
    const schedule = getValues('teacher')?.workTime;
    const cutoffDays = schedule?.filter((day) => day.isDayOff).map((day) => day.dayOfWeek);

    const localeForDate = localeDate(locale || 'en');
    const formatDateSelect = date && format(date, 'd MMMM yyyy, (EEEE)', { locale: localeForDate });

    const onChange: CalendarPickerProps<Date>['onChange'] = (date) => {
        if (date) {
            setValue('date', date);
            setActiveStep(3);
        }
    };

    return (
        <>
            <StepLabel optional={date && formatDateSelect}>
                <Typography fontWeight="bold">Дата</Typography>
            </StepLabel>
            <StepContent>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeDate(locale as string)}>
                    <CalendarPicker
                        disablePast
                        views={['day']}
                        date={date}
                        onChange={onChange}
                        shouldDisableDate={(d) => shouldDisableDate(d, cutoffDays as number[])}
                        maxDate={addDays(new Date(), 14)}
                    />
                </LocalizationProvider>
                <Buttons disableNext={!date} />
            </StepContent>
        </>
    );
};
