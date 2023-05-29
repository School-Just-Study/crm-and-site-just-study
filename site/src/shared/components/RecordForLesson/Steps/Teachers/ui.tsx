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
import { Manager, User } from '@src/shared/lib/apollo/types';
import { stringAvatar } from '@src/shared/lib/textAvatar';
import { setActiveStep } from '@shared/components/RecordForLesson/model/model';
import { useQuery } from '@apollo/client';
import { TEACHERS_QUERY } from './queryTeachers';
import { useFormContext } from 'react-hook-form';
import { LessonForm } from '@shared/components/RecordForLesson/types';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';

export const Teacher = () => {
    const { setValue, getValues, watch } = useFormContext<LessonForm>();
    const { data, loading } = useQuery<{ managers: Manager[]; users: User[] }>(TEACHERS_QUERY);
    const user = useUnit($user);
    const teacher = getValues('teacher');
    watch();

    const teachers = user?.client?.teachers?.length ? user?.client?.teachers : data?.managers;
    const handleSetTeacher = (teacher: Manager) => {
        setValue('teacher', teacher);
        setActiveStep(1);
    };

    useEffect(() => {
        if (teachers?.length === 1) {
            handleSetTeacher(teachers[0]);
        }
    }, [teachers]);

    return (
        <>
            <StepLabel optional={teacher && teacher?.name}>
                <Typography fontWeight="bold">Преподаватель</Typography>
            </StepLabel>
            <StepContent>
                {loading && <CircularProgress />}
                <List>
                    {teachers?.map((teacher) => {
                        const avatar = data?.users.find(({ manager }) => manager?.id === teacher.id)?.avatar?.image
                            ?.url;

                        return (
                            <ListItemButton
                                key={teacher.id}
                                sx={{ borderRadius: 15 }}
                                onClick={() => handleSetTeacher(teacher)}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={teacher.name as string}
                                        src={avatar}
                                        {...stringAvatar(teacher.name as string)}></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={teacher.name} />
                            </ListItemButton>
                        );
                    })}
                </List>
                <Buttons disableNext={!getValues('teacher')} />
            </StepContent>
        </>
    );
};
