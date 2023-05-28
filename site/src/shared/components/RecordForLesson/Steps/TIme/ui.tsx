import { StepContent, StepLabel, Typography } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { localeDate } from '@src/shared/lib/localeDate';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';
import { Buttons } from '@shared/components/RecordForLesson';
import { TimeSelector } from './TImeSelector';
import { format } from 'date-fns';

export const Time: FC = () => {
    const { watch } = useFormContext<LessonForm>();
    const { locale } = useRouter();
    watch();
    const selectedDate = watch('date');
    const time = watch('startTime');
    const localeForDate = localeDate(locale || 'en');
    const formatTimeSelect = time && format(time, 'H:mm', { locale: localeForDate });

    return (
        <>
            <StepLabel optional={time && formatTimeSelect}>
                <Typography fontWeight="bold">Время</Typography>
            </StepLabel>
            <StepContent>
                {selectedDate && <TimeSelector />}
                <Buttons disableNext={!time} />
            </StepContent>
        </>
    );
};
