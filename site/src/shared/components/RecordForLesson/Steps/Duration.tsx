import * as React from 'react';
import { FC, useEffect } from 'react';
import { Button, ButtonGroup, StepContent, StepLabel, Typography } from '@mui/material';
import { Buttons } from '@shared/components/RecordForLesson/Buttons';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';
import { nextActiveStep } from '@shared/components/RecordForLesson';
import {
    DEFAULT_MAX_TIME_RECORD,
    setMaxTimeForRecord
} from '@shared/components/RecordForLesson/Steps/TIme/TImeSelector/model';

const durationsOptions = [30, 60, 90];

export const Duration: FC<{ duration?: number[] }> = ({ duration = durationsOptions }) => {
    const { getValues, setValue } = useFormContext<LessonForm>();
    // @ts-ignore
    const lessonDuration = getValues('duration');

    const variant = (duration: number) => (duration === lessonDuration ? 'contained' : 'text');

    useEffect(() => {
        if (duration.length === 1) setValue('duration', duration[0]);
    }, [duration]);

    useEffect(() => {
        if (lessonDuration) nextActiveStep();
    }, [lessonDuration]);

    const handleChange = (duration: number) => {
        setValue('duration', duration);
        setMaxTimeForRecord(DEFAULT_MAX_TIME_RECORD - duration);
    };

    return (
        <>
            <StepLabel optional={lessonDuration && `${lessonDuration} мин`}>
                <Typography fontWeight="bold">Продолжительность урока</Typography>
            </StepLabel>
            <StepContent>
                <ButtonGroup sx={{ my: 2 }} variant="text" color="secondary">
                    {duration?.map((duration) => (
                        <Button
                            key={duration}
                            sx={{ px: 3 }}
                            variant={variant(duration)}
                            onClick={() => handleChange(duration)}>
                            {duration} мин
                        </Button>
                    ))}
                </ButtonGroup>
                <Buttons disableNext={!lessonDuration} />
            </StepContent>
        </>
    );
};
