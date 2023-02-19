import {
    Avatar,
    CircularProgress,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    StepContent,
    StepLabel,
    Typography
} from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { Buttons } from '@shared/components/RecordForLesson/Buttons';
import { Manager } from '@src/shared/lib/apollo/types';
import { stringAvatar } from '@src/shared/lib/textAvatar';
import { setActiveStep } from '@shared/components/RecordForLesson/model/model';
import { useQuery } from '@apollo/client';
import { TEACHERS_QUERY } from './queryTeachers';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';

export const Teacher = () => {
    const { setValue, getValues, watch } = useFormContext<LessonForm>();
    const { data, loading } = useQuery<{ managers: Manager[] }>(TEACHERS_QUERY);
    const teacher = getValues('teacher');
    watch();

    useEffect(() => {
        if (data?.managers.length === 1) setValue('teacher', data.managers[0]);
    }, [data]);

    useEffect(() => {
        if (teacher) setActiveStep(1);
    }, [getValues, teacher]);

    return (
        <>
            <StepLabel optional={teacher && teacher?.name}>
                <Typography fontWeight="bold">Преподаватель</Typography>
            </StepLabel>
            <StepContent>
                {loading && <CircularProgress />}
                <List>
                    {data?.managers?.map((teacher) => (
                        <ListItemButton
                            key={teacher.id}
                            sx={{ borderRadius: 15 }}
                            onClick={() => setValue('teacher', teacher)}>
                            <ListItemAvatar>
                                <Avatar alt={teacher.name as string} {...stringAvatar(teacher.name as string)}></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={teacher.name} />
                        </ListItemButton>
                    ))}
                </List>
                <Buttons />
            </StepContent>
        </>
    );
};
